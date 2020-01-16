import { ReactNode } from 'react';
import { PortalRect } from './PortalRect';

export interface PortalProps {
  target: string;
  children: ReactNode;
  rect: PortalRect;
}
