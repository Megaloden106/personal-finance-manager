import { MutableRefObject } from 'react';
import { Offset } from 'models/style';

export interface CircleMenuProps {
  anchor: MutableRefObject<HTMLButtonElement>;
  isOpen: boolean;
  offset?: Offset;
  setMenu(menuState: boolean): void;
}
