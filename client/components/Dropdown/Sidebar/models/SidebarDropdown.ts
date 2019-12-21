import { DropdownMenuItem } from '../../Base/models/DropdownMenuItem';

export interface SidebarDropdownProps {
  selected: string;
  menuItems: DropdownMenuItem[];
  close(): void;
  rowClick(item: DropdownMenuItem): void;
}
