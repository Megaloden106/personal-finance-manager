import { FormControl } from 'store/hooks/form/Form.models';

export interface SelectProps {
  label: string;
  control: FormControl<string>;
  menuItems: string[];
}
