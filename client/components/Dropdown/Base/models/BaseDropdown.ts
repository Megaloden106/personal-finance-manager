import { DropdownMenuItem } from './DropdownMenuItem';
import { PortalRect } from '@/components/Portal/models/Portal';

export interface BaseDropdownProps {
  selected: string;
  menuItems: DropdownMenuItem[];
  rect: PortalRect;
  title?: string;
  close(): void;
  rowClick(item: DropdownMenuItem): void;
}
