import {
  SFC,
  useEffect,
  ReactNode,
} from 'react';
import ReactDOM from 'react-dom';
import { Box, Position } from '@/shared/styleProps';

interface DropdownProp {
  target: string;
  children: ReactNode;
  pos?: Position;
  box?: Box;
}

const convertToStyle = (pos: Position, box: Box): string => {
  let htmlStyle = 'position: absolute; ';

  Object.keys(pos).forEach((key: string) => {
    htmlStyle += `${key}: ${(pos as any)[key]}px; `;
  });
  Object.keys(box).forEach((key: string) => {
    htmlStyle += `${key}: ${(box as any)[key]}px; `;
  });

  return htmlStyle;
};


const Portal: SFC<DropdownProp> = ({
  target,
  children,
  pos = {},
  box = {},
}) => {
  const portal = document.getElementById(target) as HTMLElement;

  // On change update style
  useEffect(() => {
    portal.setAttribute('style', convertToStyle(pos, box));

    return () => portal.removeAttribute('style');
  }, [pos, box]);

  return (
    ReactDOM.createPortal(
      children,
      portal,
    )
  );
};

export default Portal;
