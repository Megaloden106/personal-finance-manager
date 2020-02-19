export interface ValidationError {
  value: string;
  message: string;
}

export type Validator<T> = (value: T) => ValidationError;

export interface FormControl<T> {
  value: T;
  valid: boolean;
  dirty: boolean;
  touched: boolean;
  errors: ValidationError[];
  patchValue: (value: T, options?: FormOption) => void;
  setValidators: (validators: Validator<T> | Validator<T>[]) => void;
  clearValidators: () => void;
  markAsTouched: (options?: FormOption) => void;
  markAsDirty: (options?: FormOption) => void;
  setErrors: (errors: ValidationError | ValidationError[]) => void;
  reset: (newValue?: T) => void;
}

export interface FormOption {
  emitEvent?: boolean;
}
