export interface ValidationError {
  value: string;
  message: string;
}

export type Validator = (value: string | FormObject) => ValidationError | null;

interface AbstractControl<T> {
}

export interface FormControl extends AbstractControl<string> {
  value: string;
  valid: boolean;
  dirty: boolean;
  touched: boolean;
  errors: ValidationError[];
  patchValue: (value: string, options?: FormOption) => void;
  setValidators: (validators: Validator | Validator[]) => void;
  clearValidators: () => void;
  markAsTouched: (options?: FormOption) => void;
  markAsDirty: (options?: FormOption) => void;
  setErrors: (errors: ValidationError | ValidationError[]) => void;
}

export type FormGroup = AbstractControl<FormObject>;

export interface FormObject {
  [key: string]: string;
}

export interface Control {
  [key: string]: FormControl;
}

export interface FormOption {
  emitEvent?: boolean;
}
