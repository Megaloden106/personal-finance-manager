import {
  SFC,
  useEffect,
  ReactNode,
} from 'react';
import ReactDOM from 'react-dom';
import { ClientRect } from '@/shared/styleProps';

interface DropdownProp {
  target: string;
  children: ReactNode;
  rect: ClientRect;
}

const convertToStyle = (rect: ClientRect): string => {
  let htmlStyle = 'position: absolute; ';
  Object.keys(rect).forEach((key: string) => {
    htmlStyle += `${key}: ${(rect as any)[key]}px; `;
  });

  return htmlStyle;
};


const Portal: SFC<DropdownProp> = ({ target, children, rect }) => {
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
