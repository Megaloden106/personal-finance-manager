import { FormControl } from 'store/models/form';

export interface SelectProps {
  label: string;
  control: FormControl<string>;
  menuItems: string[];
}
