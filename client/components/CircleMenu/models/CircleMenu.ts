import { Offset } from '@/models/style';

export interface CircleMenuProps {
  anchorId: string;
  isOpen: boolean;
  offset?: Offset;
  setMenu(menuState: boolean): void;
}
