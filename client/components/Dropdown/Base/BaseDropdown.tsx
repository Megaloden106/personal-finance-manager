import React, { SFC, useEffect } from 'react';
import styles from './BaseDropdown.scss';
import Modal, { Position, Box } from '@/components/Modal/Modal';

interface Style {
  [propName: string]: string;
}

export interface Menu {
  text: string;
  value: string;
  style?: Style;
}

export interface Selected {
  data: string;
  time: string;
}

interface BaseDropdownProp {
  header?: string;
  menu: Menu[];
  pos: Position;
  box: Box;
  selected: Selected;
  rowClick: Function;
  close: Function;
}

const BaseDropdown: SFC<BaseDropdownProp> = ({
  header,
  menu,
  pos,
  box,
  selected,
  rowClick,
  close,
}) => {
  // Event listener for outside click modal click
  useEffect(() => {
    const closeEvent = (event: MouseEvent) => {
      const modal = document.getElementById('modal') as Element;
      if (!modal.contains(event.target as Node)) {
        close();
      }
    };
    document.addEventListener('click', closeEvent);

    return () => {
      document.removeEventListener('click', closeEvent);
    };
  }, []);

  // Button class based on row
  const buttonClass = (value: string) => {
    const className = [styles.item];
    if (selected.data === value || selected.time === value) {
      className.push(styles['item--selected']);
    }

    return className.join(' ');
  };

  return (
    <Modal pos={pos} box={box}>
      {header && (
        <div className={styles.header}>
          <h3>{header}</h3>
        </div>
      )}
      <div className={styles.content}>
        {menu.map(item => (
          <button
            type="button"
            onClick={() => rowClick && rowClick(item)}
            className={buttonClass(item.text)}
            style={item.style}
            value={item.value}
          >
            {item.text}
          </button>
        ))}
      </div>
    </Modal>
  );
};

export default BaseDropdown;
