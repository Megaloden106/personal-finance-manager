import React, {
  FC,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { fromEvent, Subscription, merge } from 'rxjs';
import Portal from 'components/Portal/Portal';
import { HTMLRect } from 'models/style';
import { getClassName } from 'utils/react-util';
import { DropdownProps, DropdownMenuItem } from './Dropdown.models';
import styles from './Dropdown.scss';

const Dropdown: FC<DropdownProps> = ({
  selected,
  menuItems,
  title,
  anchor,
  rowClick,
  close,
  width = 180,
  offset = {},
}) => {
  const [rect, setRect] = useState<HTMLRect>({});

  useEffect(() => {
    // Calculate position from body for dropdown
    const anchorRect = anchor.current.getBoundingClientRect();
    const body = document.body.getBoundingClientRect();

    // Logic for repositioning
    const left = anchorRect.left - width / 2 + (offset.x || 0) - body.left;
    const top = anchorRect.top + (offset.y || 0) - body.top;

    setRect({ left, top, width });

    // Close event on clicks and resize
    const subscription: Subscription = merge(
      fromEvent(document, 'click'),
      fromEvent(window, 'resize'),
    ).subscribe((event: Event) => {
      if (event.type === 'resize' || !anchor.current.contains(event.target as Node)) {
        close();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Event handler for row clicks
  const onRowClick = useCallback((menuItem: DropdownMenuItem) => {
    rowClick(menuItem);
    close();
  }, []);

  return (
    <Portal>
      <div
        style={rect}
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
            onClick={() => onRowClick(menuItem)}
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
