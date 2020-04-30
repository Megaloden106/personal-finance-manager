import React, {
  FC,
  useState,
  useEffect,
  useRef,
} from 'react';
import { Subscription, fromEvent, timer } from 'rxjs';
import { getClassName } from 'utils/react-util';
import { FormControl } from 'store/models/form';
import { Cell } from './DatePicker.models';
import styles from './DatePicker.scss';

export interface DatePickerProps {
  label: string;
  control: FormControl<string>;
}

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

  const onInputClick = () => {
    markAsTouched();
    setMenuOpen(!isMenuOpen);
  };

  const onCellClick = (cell: Cell) => {
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
  };

  const onDisplayClick = () => {
    if (view === 'day') {
      setCells([]);
      setView('month');
    }
  };

  const onNextOrPrevClick = (direction: 'next' | 'prev') => {
    const change = direction === 'next' ? 1 : -1;
    if (view === 'day') {
      setMonthIndex(monthIndex + change);
    } else {
      setYearIndex(yearIndex + change);
    }
  };

  return (
    <>
      <label
        htmlFor={`${label}-date-picker`}
        className={getClassName({
          [styles.datePicker]: true,
          [styles.datePickerError]: !!errors.length,
        })}
      >
        {label}
        <p className={styles.downArrow}>&#x25be;</p>
        <input
          id={`${label}-date-picker`}
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
                onClick={() => onNextOrPrevClick('prev')}
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
                {
                  view === 'day'
                    ? selectedDate.toLocaleString('en-US', dayViewDateOptions)
                    : selectedDate.toLocaleString('en-US', monthViewDateOptions)
                }
              </button>
              <button
                type="button"
                className={styles.navLeft}
                onClick={() => onNextOrPrevClick('next')}
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
                  onClick={() => onCellClick(cell)}
                >
                  { view === 'day' ? cell.dayOfMonth : cell.monthOfYear }
                </button>
              ))}
            </div>
          </div>
        )}
      </label>
      {errors.length ? <p className={styles.errorMessage}>{errors[0].message}</p> : null}
    </>
  );
};

export default Select;
