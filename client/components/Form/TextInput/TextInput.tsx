import React, {
  FC,
  ChangeEvent,
  ReactNode,
} from 'react';
import { getClassName } from 'utils/react-util';
import { FormControl } from 'store/models/form';
import styles from './TextInput.scss';

interface TextInputProps {
  label: string;
  control: FormControl<string>;
  children?: ReactNode;
}

const TextInput: FC<TextInputProps> = ({ label, control, children }) => {
  const {
    value,
    patchValue,
    errors,
    markAsTouched,
  } = control;

  const onChange = (event: ChangeEvent) => {
    patchValue((event.target as HTMLInputElement).value);
  };

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
        {children}
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
