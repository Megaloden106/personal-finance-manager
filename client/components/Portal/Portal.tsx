import {
  FunctionComponent,
  useEffect,
  ReactNode,
} from 'react';
import ReactDOM from 'react-dom';
import { ClientRect } from '@/shared/styleProps';

interface DropdownProps {
  target: string;
  children: ReactNode;
  rect: ClientRect;
}

const convertToStyle = (rect: ClientRect): string => {
  let htmlStyle = 'position: absolute; ';
  Object.keys(rect).forEach((key: string) => {
    htmlStyle += `${key}: ${rect[key]}px; `;
  });

  return htmlStyle;
};


const Portal: FunctionComponent<DropdownProps> = ({ target, children, rect }) => {
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
