import { useState, useEffect } from 'react';
import {
  FormControl,
  FormOption,
  Validator,
  ValidationError,
} from './Form.models';

export const useFormControl = <T = string | boolean>(
  // typescript non-issue. Parens are added already, but Generic type causing confusion
  // eslint-disable-next-line arrow-parens
  defaultValue: T,
  defualtValidators: Validator<T>[] = [],
): FormControl<T> => {
  const [value, setValue] = useState(defaultValue);
  const [validators, _setValidators] = useState(defualtValidators);
  const [errors, _setErrors] = useState<ValidationError[]>([]);
  const [valid, setValid] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (dirty && touched) {
      const validationErrors: ValidationError[] = [];
      validators.forEach((validator) => {
        const error = validator(value);
        if (error) {
          validationErrors.push(error);
        }
      });
      _setErrors(validationErrors);
      setValid(!validationErrors.length);
    }
  }, [value, validators]);

  const markAsTouched = () => setTouched(true);
  const markAsDirty = () => setDirty(true);

  const patchValue = (newValue: T, { emitEvent }: FormOption = {}) => {
    setValue(newValue);
    if (emitEvent || emitEvent === undefined) {
      markAsTouched();
      markAsDirty();
    }
  };

  const setValidators = (newValidators: Validator<T> | Validator<T>[]) => {
    if (Array.isArray(newValidators)) _setValidators(newValidators);
    else _setValidators([newValidators]);
  };
  const clearValidators = () => setValidators([]);

  const setErrors = (newErrors: ValidationError | ValidationError[]) => {
    if (Array.isArray(newErrors)) _setErrors(newErrors);
    else _setErrors([newErrors]);
  };

  return {
    value,
    valid,
    dirty,
    touched,
    errors,
    patchValue,
    setValidators,
    clearValidators,
    markAsTouched,
    markAsDirty,
    setErrors,
  };
};
