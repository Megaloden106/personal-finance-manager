import React, {
  FC,
  useEffect,
  useRef,
  useCallback,
  MouseEvent,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fromEvent, Subscription } from 'rxjs';
import { getClassName } from 'utils/react-util';
import { AppState } from 'store/models/store';
import { SidepanelTab } from 'store/models/sidepanel';
import { updateSidepanelStatusAction, updateSidepanelTabAction } from 'store/actions/sidepanel';
import Portal from 'components/Portal/Portal';
import DataPointForm from './DataPointForm/DataPointForm';
import PortfolioForm from './PortfolioForm/PortfolioForm';
import styles from './Sidepanel.scss';

const Sidepanel: FC = () => {
  const isPanelOpen = useSelector((state: AppState) => state.sidepanel.isOpen);
  const selectedTab = useSelector((state: AppState) => state.sidepanel.selectedTab);
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

  const onDelete = useCallback(() => {
    dispatch(updateSidepanelStatusAction(false));
  }, []);

  const onAdd = useCallback((event: MouseEvent) => {
    event.preventDefault();
  }, []);

  return (
    <Portal>
      <article
        ref={sidepanel}
        className={getClassName({
          [styles.sidepanel]: true,
          [styles.sidepanelOpen]: isPanelOpen,
        })}
      >
        <header className={styles.header}>
          <h1>Add New...</h1>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={() => dispatch(updateSidepanelStatusAction(false))}
          >
            x
          </button>
          <nav className={styles.nav}>
            <ul>
              {Object.values(SidepanelTab).map(tab => (
                <li key={tab}>
                  <button
                    type="button"
                    onClick={() => dispatch(updateSidepanelTabAction(tab))}
                    className={getClassName({
                      [styles.tab]: true,
                      [styles.tabSelected]: tab === selectedTab,
                    })}
                  >
                    {tab}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </header>
        <section className={styles.content}>
          <form className={styles.form}>
            {selectedTab === SidepanelTab.DataPoint ? (
              <DataPointForm />
            ) : (
              <PortfolioForm />
            )}
            <section className={styles.overlay}>
              <button
                type="button"
                className={styles.deleteBtn}
                onClick={onDelete}
              >
                Delete
              </button>
              <button
                type="submit"
                className={styles.addBtn}
                onClick={onAdd}
              >
                Add
              </button>
            </section>
          </form>
        </section>
      </article>
    </Portal>
  );
};

export default Sidepanel;
