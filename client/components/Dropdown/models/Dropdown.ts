import { Offset, Style } from '@/models/style';

export interface DropdownMenuItem {
  label: string;
  style?: Style;
}

export interface DropdownProps {
  anchorId: string;
  menuItems: DropdownMenuItem[];
  offset?: Offset;
  selected: string;
  title?: string;
  width?: number;
  close(): void;
  rowClick(item: DropdownMenuItem): void;
}
