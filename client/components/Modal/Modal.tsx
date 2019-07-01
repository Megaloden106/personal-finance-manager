import {
  SFC,
  useEffect,
  ReactNode,
  useState,
} from 'react';
import ReactDOM from 'react-dom';
import style from './Modal.scss';

export interface Position {
  top?: number | string;
  right?: number | string;
  bottom?: number | string;
  left?: number | string;
}

export interface Box {
  width?: number | string;
  height?: number | string;
}

interface DropdownProp {
  children: ReactNode;
  pos?: Position;
  box?: Box;
}

const modalRoot = document.getElementById('modal') as HTMLElement;

const convertToStyle = (pos: Position, box: Box): string => {
  let htmlStyle = '';

  Object.keys(pos).forEach((key: string) => {
    htmlStyle += `${key}: ${(pos as any)[key]}px; `;
  });
  Object.keys(box).forEach((key: string) => {
    htmlStyle += `${key}: ${(box as any)[key]}px; `;
  });

  return htmlStyle;
};


const Modal: SFC<DropdownProp> = ({ children, pos = {}, box = {} }) => {
  const [element, setElement] = useState<Element>(document.createElement('div'));
  element.classList.add(style.modal);

  // On change update style
  useEffect(() => {
    element.setAttribute('style', convertToStyle(pos, box));
    setElement(element);
  }, [pos, box]);

  // Mount and unmount element
  useEffect(() => {
    modalRoot.appendChild(element);

    return () => {
      modalRoot.removeChild(element);
    };
  }, []);

  return (
    ReactDOM.createPortal(
      children,
      element,
    )
  );
};

export default Modal;
