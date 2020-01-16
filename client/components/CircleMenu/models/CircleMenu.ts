import { Offset } from './Offset';

export interface CircleMenuProps {
  anchorId: string;
  isOpen: boolean;
  offset?: Offset;
  setMenu(menuState: boolean): void;
}
