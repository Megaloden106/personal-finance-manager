import { ValidationError, Validator } from 'store/models/form';

export class Validation {
  public static Required(value: string | boolean): ValidationError {
    const error: ValidationError = { value, message: 'Field is required.' };

    if (typeof value === 'string') {
      return value === '' ? error : null;
    }
    if (typeof value === 'number') {
      return value === 0 ? error : null;
    }
    if (typeof value === 'boolean') {
      return !value ? error : null;
    }
    return null;
  }

  public static RequiredDropdown(value: string): ValidationError {
    return value.match('Select') ? { value, message: 'Field is required.' } : null;
  }

  public static Currency(value: string): ValidationError {
    if (typeof value === 'number') return null;
    const decimal = value.split('.')[1];
    return !Number(value) || (decimal && decimal.length > 2)
      ? { value, message: 'Field must be a valid currency.' }
      : null;
  }

  public static MaxLength(length: number): Validator<string> {
    return (value: string): ValidationError => (
      value.length > length
        ? { value, message: `Field has excceded ${length} characters` }
        : null
    );
  }
}
