import React, { FunctionComponent, useEffect, useState } from 'react';
import { fromEvent, Subscription, merge } from 'rxjs';
import Portal from '@/components/Portal/Portal';
import styles from './BaseDropdown.scss';

interface BaseDropdownProps {
  filter: PortfolioFilter;
  menu: Item[];
  rect: PortalRect;
  title?: string;
  close(): void;
  rowClick(item: Item): void;
}

const BaseDropdown: FunctionComponent<BaseDropdownProps> = ({
  filter,
  menu,
  rect,
  title,
  rowClick,
  close,
}) => {
  const [dropdownStyle, setDropdownStyle] = useState([styles.dropdown]);

  // Event handler for closing dropdown
  const handleCloseEvent = (event: Event) => {
    const modal = document.getElementById('dropdown') as HTMLElement;
    if (event.type === 'resize' || !modal.contains(event.target as Node)) {
      close();
    }
  };

  // Event handler for row clicks
  const handleRowClick = (item: Item) => {
    rowClick(item);
    close();
  };

  // Event listener for outside click dropdown click
  useEffect(() => {
    // Delayed style for animation
    setDropdownStyle(dropdownStyle.concat(styles.dropdownOpen));

    // Close event on clicks and resize
    const subscription: Subscription = merge(
      fromEvent(document, 'click'),
      fromEvent(window, 'resize'),
    ).subscribe(handleCloseEvent);

    return () => subscription.unsubscribe();
  }, []);

  // Button class based on row
  const buttonClass = (value: string) => {
    const className = [styles.item];
    if (filter.data === value || filter.time === value) {
      className.push(styles.itemSelected);
    }

    return className.join(' ');
  };

  return (
    <Portal rect={rect} target="dropdown">
      <div className={dropdownStyle.join(' ')}>
        {title && (
          <div className={styles.header}>
            <h3>{title}</h3>
          </div>
        )}
        <div className={styles.content}>
          {menu.map(item => (
            <button
              key={item.text}
              type="button"
              onClick={() => handleRowClick(item)}
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
