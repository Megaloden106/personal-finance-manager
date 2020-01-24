import { useState, useEffect } from 'react';
import { Validator } from '@/models/validation';

export const useValidation = (
  defaultValue: string,
  onChange: (value: string) => void,
  validations: Validator[],
) => {
  const [value, setValue] = useState<string>(defaultValue);
  const [errorMsg, setErrorMsg] = useState<string>(null);
  const [isDirty, setDirty] = useState<boolean>(false);
  const [isTouched, setTouched] = useState<boolean>(false);

  useEffect(() => {
    if (isDirty && isTouched) {
      for (let i = 0; i < validations.length; i += 1) {
        const error = validations[i](value);
        if (error) {
          setErrorMsg(error.message);
          break;
        }
      }
    }
  }, [value]);

  const onValueChange = (event: Event) => {
    setDirty(true);
    setValue(value);
    onChange((event.target as HTMLInputElement).value);
  };

  const onClick = () => setTouched(true);

  return [value, onValueChange, onClick, errorMsg];
};
