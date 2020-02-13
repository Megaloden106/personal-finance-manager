import React, {
  FC,
  MouseEvent,
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import { Subscription, fromEvent, timer } from 'rxjs';
import { SelectProps } from './models/Select';
import styles from './Select.scss';
import { getClassName } from '@/utils/react-util';

const Select: FC<SelectProps> = ({ label, control, menuItems }) => {
  const {
    value,
    patchValue,
    errors,
    markAsTouched,
  } = control;
  const [isMenuOpen, setMenuOpen] = useState(false);
  const dropdown = useRef(null);

  useEffect(() => {
    const subscription: Subscription = new Subscription();
    if (isMenuOpen) {
      const onClickSub = fromEvent(document, 'click').subscribe((event: Event) => {
        if (!dropdown.current.contains(event.target as Node)) {
          setMenuOpen(false);
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

  const onMenuItemClick = useCallback((event: MouseEvent) => {
    event.preventDefault();
    patchValue((event.target as HTMLButtonElement).innerText);

    // prevent sidepanel from closing by putting command at end of event loop
    timer(0).subscribe(() => setMenuOpen(false));
  }, []);

  return (
    <label htmlFor={label} className={styles.select}>
      {`${label}`}
      <p className={styles.downArrow}>&#x25be;</p>
      <input
        type="text"
        value={value}
        onClick={onInputClick}
        readOnly
      />
      {isMenuOpen && (
        <div ref={dropdown} className={styles.menu}>
          {menuItems.map(menuItem => (
            <button
              className={getClassName({
                [styles.menuSelected]: menuItem === value,
              })}
              key={menuItem}
              type="button"
              onClick={onMenuItemClick}
            >
              {menuItem}
            </button>
          ))}
        </div>
      )}
      {errors.length ? <p className={styles.errorMessage}>{errors[0].message}</p> : null}
    </label>
  );
};

export default Select;
