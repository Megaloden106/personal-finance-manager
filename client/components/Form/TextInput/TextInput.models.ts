import { FormControl } from 'store/models/form';
import { ReactNode } from 'react';

export interface TextInputProps {
  label: string;
  control: FormControl<string | number>;
  children?: ReactNode;
}
