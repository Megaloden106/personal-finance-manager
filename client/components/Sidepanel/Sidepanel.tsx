import React, { FC, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fromEvent, Subscription } from 'rxjs';
import Portal from '../Portal/Portal';
import styles from './Sidepanel.scss';
import { getClassName } from '@/utils/react-util';
import { AppState } from '@/store/models/store';
import { updateSidepanelStatusAction } from '@/store/actions/sidepanel';

const Sidepanel: FC = () => {
  const isPanelOpen = useSelector((state: AppState) => state.sidepanel.isOpen);
  const dispatch = useDispatch();

  const sidepanel = useRef(null);

  useEffect(() => {
    const subscription: Subscription = new Subscription();
    if (isPanelOpen) {
      const onClickSub = fromEvent(document, 'click').subscribe((event: Event) => {
        if (!sidepanel.current.contains(event.target as Node)) {
          dispatch(updateSidepanelStatusAction(false));
        }
      });
      subscription.add(onClickSub);
    }

    return () => subscription.unsubscribe();
  }, [isPanelOpen]);

  return (
    <Portal>
      <div
        ref={sidepanel}
        className={getClassName({
          [styles.sidepanel]: true,
          [styles.sidepanelOpen]: isPanelOpen,
        })}
      >
        Hello World
      </div>
    </Portal>
  );
};

export default Sidepanel;
