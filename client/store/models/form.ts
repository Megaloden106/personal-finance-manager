export interface ValidationError {
  value: string | boolean;
  message: string;
}

export type Validator<T> = (value: T) => ValidationError;

export interface FormOption {
  emitEvent?: boolean;
}

interface AbstractControl<T> {
  valid: boolean;
  dirty: boolean;
  touched: boolean;
  markAsTouched: (options?: FormOption) => void;
  markAsDirty: (options?: FormOption) => void;
  validate: (options?: FormOption) => void;
}

export interface FormControl<T> extends AbstractControl<T> {
  value: T;
  errors: ValidationError[];
  patchValue: (newValue: T, options?: FormOption) => void;
  setErrors: (errors: ValidationError | ValidationError[]) => void;
  setValidators: (validators: Validator<T> | Validator<T>[]) => void;
  clearValidators: () => void;
  reset: (newValue?: T) => void;
}

export interface FormGroup {
  [key: string]: FormControl<string> | FormControl<boolean>;
}
