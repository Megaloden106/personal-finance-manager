import React, {
  FC,
  MouseEvent,
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import { Subscription, fromEvent, timer } from 'rxjs';
import { DatePickerProps, Cell } from './DatePicker.models';
import styles from './DatePicker.scss';
import { getClassName } from '@/utils/react-util';

const valueDateOptions = {
  year: 'numeric',
  month: 'long',
  weekday: 'long',
  day: 'numeric',
};

const dayViewDateOptions = {
  year: 'numeric',
  month: 'short',
};

const monthViewDateOptions = {
  year: 'numeric',
};

const monthDateOptions = {
  month: 'short',
};

const weekdays = ['Su', 'Mo', ' Tu', 'We', 'Th', 'Fi', 'Sa'];

const Select: FC<DatePickerProps> = ({ label, control }) => {
  const {
    value,
    patchValue,
    errors,
    markAsTouched,
  } = control;
  const [view, setView] = useState<'day' | 'month'>('day');
  const [cells, setCells] = useState<Cell[]>([]);
  const [monthIndex, setMonthIndex] = useState(0);
  const [yearIndex, setYearIndex] = useState(0);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(null);
  const calendar = useRef(null);

  useEffect(() => {
    const selected = value !== 'Select' ? new Date(value) : new Date();
    selected.setHours(0, 0, 0, 0);
    const nextMonth = selected.getMonth() + monthIndex;
    selected.setMonth(nextMonth);
    if (selected.getMonth() !== nextMonth) {
      selected.setMonth(nextMonth);
    }
    const nextYear = selected.getFullYear() + yearIndex;
    selected.setFullYear(nextYear);
    setSelectedDate(selected);
    const firstDay = new Date(selected.getFullYear(), selected.getMonth(), 1);
    const lastDay = new Date(selected.getFullYear(), selected.getMonth() + 1, 0);

    if (view === 'day') {
      const newCells: Cell[] = new Array(lastDay.getDate() + firstDay.getDay())
        .fill(null)
        .map((_, i) => {
          const dayOfMonth = i - firstDay.getDay() + 1;
          if (i < firstDay.getDay()) {
            return {
              date: new Date(selected.getFullYear(), selected.getMonth(), dayOfMonth),
              isBlankCell: true,
            };
          }

          return {
            dayOfMonth,
            date: new Date(selected.getFullYear(), selected.getMonth(), dayOfMonth),
            isBlankCell: false,
            isSelected: monthIndex === 0 && dayOfMonth === selected.getDate(),
            isFuture: monthIndex > 0 || (
              monthIndex === 0 && dayOfMonth > (new Date()).getDate()
            ),
          };
        });
      setCells(newCells);
    } else if (view === 'month') {
      const newCells: Cell[] = new Array(12)
        .fill(null)
        .map((_, i) => {
          const date = new Date(selected.getFullYear(), i);
          return {
            date,
            monthOfYear: date.toLocaleString('en-US', monthDateOptions),
            isSelected: yearIndex === 0 && i === selected.getMonth() - monthIndex,
            isFuture: yearIndex > 0 || (
              yearIndex === 0 && date.getMonth() > (new Date()).getMonth()
            ),
          };
        });
      setCells(newCells);
    }
  }, [value, view, monthIndex, yearIndex]);

  useEffect(() => {
    const subscription: Subscription = new Subscription();
    if (isMenuOpen) {
      const onClickSub = fromEvent(document, 'click').subscribe((event: Event) => {
        if (!calendar.current.contains(event.target as Node)) {
          setMenuOpen(false);
          setView('day');
        }
      });
      subscription.add(onClickSub);
    }

    return () => subscription.unsubscribe();
  }, [isMenuOpen]);

  const onInputClick = useCallback((event: MouseEvent) => {
    event.preventDefault();
    markAsTouched();
    setMenuOpen(!isMenuOpen);
  }, []);

  const onCellClick = useCallback((event: MouseEvent, cell: Cell) => {
    event.preventDefault();
    if (view === 'day') {
      setMonthIndex(0);
      setYearIndex(0);
      patchValue(cell.date.toLocaleString('en-US', valueDateOptions));

      // prevent sidepanel from closing by putting command at end of event loop
      timer(0).subscribe(() => setMenuOpen(false));
    } else {
      setView('day');
      setMonthIndex(monthIndex + cell.date.getMonth() - selectedDate.getMonth());
    }
  }, [view, monthIndex]);

  const onDisplayClick = useCallback(() => {
    if (view === 'day') {
      setCells([]);
      setView('month');
    }
  }, [view]);

  const onNextOrPrevClick = useCallback((event: MouseEvent, direction: 'next' | 'prev') => {
    event.preventDefault();
    const change = direction === 'next' ? 1 : -1;
    if (view === 'day') {
      setMonthIndex(monthIndex + change);
    } else {
      setYearIndex(yearIndex + change);
    }
  }, [view, monthIndex, yearIndex]);

  return (
    <label htmlFor={label} className={styles.datePicker}>
      {`${label}`}
      <p className={styles.downArrow}>&#x25be;</p>
      <input
        type="text"
        value={value}
        onClick={onInputClick}
        readOnly
      />
      {isMenuOpen && (
        <div ref={calendar} className={styles.calendar}>
          <div className={styles.nav}>
            <button
              type="button"
              className={styles.navLeft}
              onClick={e => onNextOrPrevClick(e, 'prev')}
            >
              &#x3c;
            </button>
            <button
              type="button"
              className={getClassName({
                [styles.display]: true,
                [styles.displayDisabled]: view === 'month',
              })}
              onClick={onDisplayClick}
            >
              { view === 'day'
                ? selectedDate.toLocaleString('en-US', dayViewDateOptions)
                : selectedDate.toLocaleString('en-US', monthViewDateOptions)
              }
            </button>
            <button
              type="button"
              className={styles.navLeft}
              onClick={e => onNextOrPrevClick(e, 'next')}
            >
              &#x3e;
            </button>
          </div>
          <div
            className={getClassName({
              [styles.grid]: view === 'day',
              [styles.gridMonth]: view === 'month',
            })}
          >
            {view === 'day' && weekdays.map(day => (
              <p key={day} className={styles.weekCell}>{ day }</p>
            ))}
            {cells.map(cell => (
              <button
                type="button"
                key={cell.date.toLocaleString()}
                className={getClassName({
                  [styles.dayCell]: view === 'day',
                  [styles.monthCell]: view === 'month',
                  [styles.dayCellSelected]: cell.isSelected,
                  [styles.dayCellBlank]: cell.isBlankCell,
                  [styles.dayCellDisabled]: cell.isFuture,
                })}
                onClick={e => onCellClick(e, cell)}
              >
                { view === 'day' ? cell.dayOfMonth : cell.monthOfYear }
              </button>
            ))}
          </div>
        </div>
      )}
      {errors.length ? <p className={styles.errorMessage}>{errors[0].message}</p> : null}
    </label>
  );
};

export default Select;
