import React, {
  FC,
  MouseEvent,
  useState,
  useEffect,
  useRef,
} from 'react';
import { Subscription, fromEvent, timer } from 'rxjs';
import { getClassName } from 'utils/react-util';
import { FormControl } from 'store/models/form';
import styles from './Select.scss';

interface SelectProps {
  label: string;
  control: FormControl<string>;
  menuItems: string[];
}

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

  const onInputClick = (event: MouseEvent) => {
    event.preventDefault();
    markAsTouched();
    setMenuOpen(!isMenuOpen);
  };

  const onMenuItemClick = (event: MouseEvent) => {
    event.preventDefault();
    patchValue((event.target as HTMLButtonElement).innerText);

    // prevent sidepanel from closing by putting command at end of event loop
    timer(0).subscribe(() => setMenuOpen(false));
  };

  return (
    <>
      <label
        htmlFor={`${label}-select`}
        className={getClassName({
          [styles.select]: true,
          [styles.selectError]: !!errors.length,
        })}
      >
        {label}
        <p className={styles.downArrow}>&#x25be;</p>
        <input
          id={`${label}-select`}
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
      </label>
      {errors.length ? <p className={styles.errorMessage}>{errors[0].message}</p> : null}
    </>
  );
};

export default Select;
