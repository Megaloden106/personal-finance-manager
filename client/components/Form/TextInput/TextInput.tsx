import React, { FC, ChangeEvent, useCallback } from 'react';
import { getClassName } from 'utils/react-util';
import { TextInputProps } from './TextInput.models';
import styles from './TextInput.scss';

const TextInput: FC<TextInputProps> = ({ label, control }) => {
  const {
    value,
    patchValue,
    errors,
    markAsTouched,
  } = control;

  const onChange = useCallback((event: ChangeEvent) => {
    patchValue((event.target as HTMLInputElement).value);
  }, []);

  return (
    <>
      <label
        htmlFor={`${label}-text-input`}
        className={getClassName({
          [styles.textInput]: true,
          [styles.textInputError]: !!errors.length,
        })}
      >
        {label}
        <p className={styles.icon}>$</p>
        <input
          id={`${label}-text-input`}
          type="text"
          value={value}
          onChange={onChange}
          onClick={() => markAsTouched()}
        />
      </label>
      {errors.length ? <p className={styles.errorMessage}>{errors[0].message}</p> : null}
    </>
  );
};

export default TextInput;
