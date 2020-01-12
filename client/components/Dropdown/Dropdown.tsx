import React, { FC, useEffect, useState } from 'react';
import { fromEvent, Subscription, merge } from 'rxjs';
import Portal from '@/components/Portal/Portal';
import styles from './Dropdown.scss';
import { DropdownMenuItem } from './models/DropdownMenuItem';
import { DropdownProps } from './models/Dropdown';
import { getClassName } from '@/utils/react-util';
import { PortalRect } from '@/components/Portal/models/Portal';

const Dropdown: FC<DropdownProps> = ({
  selected,
  menuItems,
  title,
  anchorId,
  rowClick,
  close,
  width = 180,
  offset = {},
}) => {
  const [rect, setRect] = useState<PortalRect>({});

  useEffect(() => {
    // Calculate position from body for dropdown
    const anchor = document.getElementById(anchorId)
      .getBoundingClientRect();
    const body = document.body.getBoundingClientRect();

    // Logic for repositioning
    const left = anchor.left - width / 2 + (offset.y || 0) - body.left;
    const top = anchor.top + (offset.x || 0) - body.top;

    setRect({ left, top, width });

    // Close event on clicks and resize
    const subscription: Subscription = merge(
      fromEvent(document, 'click'),
      fromEvent(window, 'resize'),
    ).subscribe((event: Event) => {
      const modal = document.getElementById('dropdown');
      if (event.type === 'resize' || !modal.contains(event.target as Node)) {
        close();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Event handler for row clicks
  const handleRowClick = (menuItem: DropdownMenuItem) => {
    rowClick(menuItem);
    close();
  };

  return (
    <Portal rect={rect} target="dropdown">
      <div
        className={getClassName({
          [styles.dropdown]: true,
          [styles.dropdownOpen]: !!rect.width,
        })}
      >
        {title && (
          <div className={styles.header}>
            <h3>{title}</h3>
          </div>
        )}
        {menuItems.map(menuItem => (
          <button
            key={menuItem.label}
            type="button"
            onClick={() => handleRowClick(menuItem)}
            className={getClassName({
              [styles.item]: true,
              [styles.itemSelected]: selected === menuItem.label,
            })}
            style={menuItem.style}
          >
            {menuItem.label}
          </button>
        ))}
      </div>
    </Portal>
  );
};

export default Dropdown;
