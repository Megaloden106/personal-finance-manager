import { useState, useEffect } from 'react';
import {
  FormControl,
  FormOption,
  Validator,
  ValidationError,
} from 'store/models/form';

export const useFormControl = <T = string | boolean>(
  // typescript non-issue. Parens are added already, but Generic type causing confusion
  // eslint-disable-next-line arrow-parens
  defaultValue: T,
  defualtValidators: Validator<T>[] = [],
): FormControl<T> => {
  const [value, setValue] = useState(defaultValue);
  const [validators, _setValidators] = useState(defualtValidators);
  const [errors, _setErrors] = useState<ValidationError[]>([]);
  const [valid, setValid] = useState(true);
  const [dirty, setDirty] = useState(false);
  const [touched, setTouched] = useState(false);

  const markAsTouched = () => setTouched(true);
  const markAsDirty = () => setDirty(true);

  const validate = ({ emitEvent }: FormOption = {}) => {
    if (emitEvent || emitEvent === undefined) {
      markAsTouched();
      markAsDirty();
    }
    const validationErrors: ValidationError[] = [];
    validators.forEach((validator) => {
      const error = validator(value);
      if (error) {
        validationErrors.push(error);
      }
    });
    _setErrors(validationErrors);
    setValid(!validationErrors.length);
  };

  useEffect(() => {
    if (dirty && touched) {
      validate();
    }
  }, [value, validators]);

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

  const reset = (newValue?: T) => {
    setTouched(false);
    setDirty(false);
    _setErrors([]);
    setValid(true);
    setValue(newValue || defaultValue);
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
    reset,
    validate,
  };
};
