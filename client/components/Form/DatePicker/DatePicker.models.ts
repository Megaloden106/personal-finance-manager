import { FormControl } from 'store/hooks/form/Form.models';

export interface DatePickerProps {
  label: string;
  control: FormControl<string>;
}

export interface Cell {
  date?: Date;
  dayOfMonth?: number;
  monthOfYear?: string;
  isBlankCell?: boolean;
  isSelected?: boolean;
  isFuture?: boolean;
}
