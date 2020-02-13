import { FormControl } from 'store/hooks/form/models/Form';

export interface DatePickerProps {
  label: string;
  control: FormControl;
}

export interface Cell {
  date?: Date;
  dayOfMonth?: number;
  monthOfYear?: string;
  isBlankCell?: boolean;
  isSelected?: boolean;
  isFuture?: boolean;
}
