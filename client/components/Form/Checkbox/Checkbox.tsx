import React, { FC, ChangeEvent, useCallback } from 'react';
import { CheckboxProps } from './Checkbox.models';
import styles from './Checkbox.scss';

const Checkbox: FC<CheckboxProps> = ({ label, control }) => {
  const {
    value,
    patchValue,
    errors,
    markAsTouched,
  } = control;

  const onChange = useCallback((event: ChangeEvent) => {
    patchValue((event.target as HTMLInputElement).checked);
  }, []);

  return (
    <>
      <input
        id={`${label}-checkbox`}
        className={styles.checkboxInput}
        type="checkbox"
        checked={value}
        onChange={onChange}
        onClick={() => markAsTouched()}
      />
      <label htmlFor={`${label}-checkbox`} className={styles.checkbox}>
        <button type="button" className={styles.checkboxButton}>&#x2714;</button>
        {label}
      </label>
      {errors.length ? <p className={styles.errorMessage}>{errors[0].message}</p> : null}
    </>
  );
};

export default Checkbox;
