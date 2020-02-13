import React, { FC, ChangeEvent, useCallback } from 'react';
import { TextInputProps } from './models/TextInput';
import styles from './TextInput.scss';

const TextInput: FC<TextInputProps> = ({ label, control }) => {
  const {
    value,
    patchValue,
    errors,
    markAsTouched,
  } = control;

  const onChange = useCallback((event: ChangeEvent) => {
    event.preventDefault();
    patchValue((event.target as HTMLInputElement).value);
  }, []);

  return (
    <label htmlFor={label} className={styles.textInput}>
      {`${label}`}
      <p className={styles.icon}>$</p>
      <input
        type="text"
        value={value}
        onChange={onChange}
        onClick={() => markAsTouched()}
      />
      {errors.length ? <p className={styles.errorMessage}>{errors[0].message}</p> : null}
    </label>
  );
};

export default TextInput;
