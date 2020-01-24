export interface ValidationError {
  value: string;
  message: string;
}

export type Validator = (value: string) => ValidationError | null;
