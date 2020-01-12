import { DropdownMenuItem } from './DropdownMenuItem';
import { Offset } from './Offset';

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
