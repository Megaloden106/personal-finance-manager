import { FC, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { PortalProps } from './models/Portal';
import { convertToStyle } from '@/utils/util';

const Portal: FC<PortalProps> = ({ target, children, rect }) => {
  const portal = document.getElementById(target);

  // On change update style
  useEffect(() => {
    portal.setAttribute('style', convertToStyle(rect));

    return () => portal.removeAttribute('style');
  }, [rect]);

  return ReactDOM.createPortal(children, portal);
};

export default Portal;
