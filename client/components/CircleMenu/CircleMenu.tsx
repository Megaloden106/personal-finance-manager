import React, { FC, useState, useEffect } from 'react';
import { PortalRect } from '@/components/Portal/models/Portal';
import Portal from '@/components/Portal/Portal';
import { CircleMenuProps } from './models/CircleMenu';
import styles from './CircleMenu.scss';
import { getClassName } from '@/utils/react-util';

const CircleMenu: FC<CircleMenuProps> = ({ anchorId, isOpen }) => {
  const [rect, setRect] = useState<PortalRect>({});

  useEffect(() => {
    // Calculate position from body for circle menu
    const anchor = document.getElementById(anchorId)
      .getBoundingClientRect();
    const body = document.body.getBoundingClientRect();

    // Logic for repositioning
    const left = anchor.left - body.left;
    const top = anchor.top - body.top;

    setRect({ left, top });
  }, []);

  return (
    <Portal rect={rect} target="circle-menu">
      <div
        className={getClassName({
          [styles.menuItem]: true,
          [styles.menuItemOpen]: isOpen,
        })}
      >
        Graph
      </div>
      <div
        className={getClassName({
          [styles.menuItem]: true,
          [styles.menuItemOpen]: isOpen,
        })}
      >
        List
      </div>
      <div
        className={getClassName({
          [styles.menuItem]: true,
          [styles.menuItemOpen]: isOpen,
        })}
      >
        Add
      </div>
    </Portal>
  );
};

export default CircleMenu;
