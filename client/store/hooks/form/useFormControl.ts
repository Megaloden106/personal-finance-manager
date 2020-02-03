import { useState, useEffect } from 'react';
import {
  FormControl,
  FormOption,
  Validator,
  ValidationError,
} from './models/Form';

export const useFormControl = (
  defaultValue: string,
  defualtValidators: Validator[] = [],
): FormControl => {
  const [value, setValue] = useState<string>(defaultValue);
  const [validators, _setValidators] = useState<Validator[]>(defualtValidators);
  const [errors, _setErrors] = useState<ValidationError[]>([]);
  const [valid, setValid] = useState<boolean>(false);
  const [dirty, setDirty] = useState<boolean>(false);
  const [touched, setTouched] = useState<boolean>(false);

  useEffect(() => {
    if (dirty && touched) {
      const validationErrors = [];
      for (let i = 0; i < validators.length; i += 1) {
        const error = validators[i](value);
        if (error) {
          validationErrors.push(error);
        }
      }
      _setErrors(validationErrors);
      setValid(!validationErrors.length);
    }
  }, [value, validators]);

  const markAsTouched = () => setTouched(true);
  const markAsDirty = () => setDirty(true);

  const patchValue = (newValue: string, { emitEvent }: FormOption = {}) => {
    setValue(newValue);
    if (emitEvent || emitEvent === undefined) {
      markAsTouched();
      markAsDirty();
    }
  };

  const setValidators = (newValidators: Validator | Validator[]) => {
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
