import { FC, useEffect, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { PortalRect } from './models/Portal';
import { convertToStyle } from '@/utils/util';

interface DropdownProps {
  target: string;
  children: ReactNode;
  rect: PortalRect;
}

const Portal: FC<DropdownProps> = ({ target, children, rect }) => {
  const portal = document.getElementById(target) as HTMLElement;

  // On change update style
  useEffect(() => {
    portal.setAttribute('style', convertToStyle(rect));

    return () => portal.removeAttribute('style');
  }, [rect]);

  return (
    ReactDOM.createPortal(
      children,
      portal,
    )
  );
};

export default Portal;
