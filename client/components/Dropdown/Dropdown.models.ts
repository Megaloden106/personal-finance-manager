import { MutableRefObject } from 'react';
import { Offset, Style } from 'models/style';

export interface DropdownMenuItem {
  label: string;
  style?: Style;
}

export interface DropdownProps {
  anchor: MutableRefObject<HTMLButtonElement>;
  menuItems: DropdownMenuItem[];
  offset?: Offset;
  selected: string;
  title?: string;
  width?: number;
  close(): void;
  rowClick(item: DropdownMenuItem): void;
}
