import React, { FC, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Subscription, merge, fromEvent } from 'rxjs';
import Portal from '@/components/Portal/Portal';
import Graph from '@/components/Graph/Graph';
import { CircleMenuProps } from './models/CircleMenu';
import styles from './CircleMenu.scss';
import { getClassName } from '@/utils/react-util';
import { updateSidepanelStatusAction } from '@/store/actions/sidepanel';
import { HTMLRect } from '@/models/style';

const graphData = [
  { date: new Date(2020, 0, 1), returns: 0 },
  { date: new Date(2020, 0, 5), returns: 15 },
  { date: new Date(2020, 0, 10), returns: 7 },
  { date: new Date(2020, 0, 15), returns: 25 },
];

const graphFilter = { data: 'returns' };

const CircleMenu: FC<CircleMenuProps> = ({ anchor, isOpen, setMenu }) => {
  const dispatch = useDispatch();

  const [rect, setRect] = useState<HTMLRect>({});


  const setPosition = () => {
    // Calculate position from body for circle menu
    const anchorRect = anchor.current.getBoundingClientRect();
    const body = document.body.getBoundingClientRect();

    // Logic for repositioning
    const left = anchorRect.left - body.left;
    const top = anchorRect.top - body.top;

    setRect({ left, top });
  };

  useEffect(() => {
    setPosition();

    // Close event on clicks and resize
    const subscription: Subscription = merge(
      fromEvent(document, 'click'),
      fromEvent(window, 'resize'),
    ).subscribe((event: Event) => {
      if (event.type === 'resize' || !anchor.current.contains(event.target as Node)) {
        if (event.type === 'resize') {
          setPosition();
        }
        setMenu(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <Portal>
      <div
        style={rect}
        className={styles.circleMenu}
      >
        <button
          type="button"
          className={getClassName({
            [styles.menuItem]: true,
            [styles.menuItemOpen]: isOpen,
          })}
        >
          <Graph
            height={32}
            width={32}
            filter={graphFilter}
            data={graphData}
            lineColor="#1591b6"
            lineWidth={2}
            setNext={() => {}}
          />
        </button>
        <button
          type="button"
          className={getClassName({
            [styles.menuItem]: true,
            [styles.menuItemOpen]: isOpen,
          })}
        >
          List
        </button>
        <button
          type="button"
          className={getClassName({
            [styles.menuItem]: true,
            [styles.menuItemOpen]: isOpen,
          })}
          onClick={() => dispatch(updateSidepanelStatusAction(true))}
        >
          Add
        </button>
      </div>
    </Portal>
  );
};

export default CircleMenu;
