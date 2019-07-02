import React, { SFC, useEffect, useState } from 'react';
import { fromEvent } from 'rxjs';
import { Box, Position } from '@/shared/styleProps';
import { Menu, Selected } from '@/shared/dropdown';
import Portal from '@/components/Portal/Portal';
import styles from './BaseDropdown.scss';

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
  const [dropdownStyle, setDropdownStyle] = useState([styles.dropdown]);

  // Event listener for outside click dropdown click
  useEffect(() => {
    setDropdownStyle(dropdownStyle.concat(styles.dropdownOpen));

    const closeEvent = (event: Event) => {
      const modal = document.getElementById('dropdown') as Element;
      if (!modal.contains(event.target as Node)) {
        close();
      }
    };
    const subscription = fromEvent(document, 'click')
      .subscribe(closeEvent);

    return () => subscription.unsubscribe();
  }, []);

  // Button class based on row
  const buttonClass = (value: string) => {
    const className = [styles.item];
    if (selected.data === value || selected.time === value) {
      className.push(styles.itemSelected);
    }

    return className.join(' ');
  };

  return (
    <Portal pos={pos} box={box} target="dropdown">
      <div className={dropdownStyle.join(' ')}>
        {header && (
          <div className={styles.header}>
            <h3>{header}</h3>
          </div>
        )}
        <div className={styles.content}>
          {menu.map(item => (
            <button
              type="button"
              onClick={() => rowClick(item)}
              className={buttonClass(item.text)}
              style={item.style}
              value={item.value}
            >
              {item.text}
            </button>
          ))}
        </div>
      </div>
    </Portal>
  );
};

export default BaseDropdown;
