import { FormControl } from 'store/hooks/form/models/Form';

export interface SelectProps {
  label: string;
  control: FormControl;
  menuItems: string[];
}
