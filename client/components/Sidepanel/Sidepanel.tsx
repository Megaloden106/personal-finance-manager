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
import { updateSidepanelStatusAction } from 'store/actions/sidepanel';
import { useFormControl } from 'store/hooks/form/useFormControl';
import { portfolioListByNameSelector } from 'store/selectors/portfolios/PortfolioSelector';
import TextInput from 'components/Form/TextInput/TextInput';
import Select from 'components/Form/Select/Select';
import DatePicker from 'components/Form/DatePicker/DatePicker';
import Portal from 'components/Portal/Portal';
import Checkbox from 'components/Form/Checkbox/Checkbox';
import styles from './Sidepanel.scss';

const Sidepanel: FC = () => {
  const isPanelOpen = useSelector((state: AppState) => state.sidepanel.isOpen);
  const portfolioListByName = useSelector(portfolioListByNameSelector);
  const dispatch = useDispatch();
  const sidepanel = useRef(null);

  const portfolio = useFormControl('Select');
  const date = useFormControl('Select');
  const balance = useFormControl('');
  const deposit = useFormControl('');
  const withdrawal = useFormControl('');
  const group = useFormControl(false);

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
    portfolio.reset();
    date.reset();
    balance.reset();
    deposit.reset();
    withdrawal.reset();
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
        </header>
        <section className={styles.content}>
          <form className={styles.form}>
            <DatePicker label="Date" control={date} />
            <Select label="Portfolio" control={portfolio} menuItems={portfolioListByName} />
            <TextInput label="Balance" control={balance} />
            <TextInput label="Deposit" control={deposit} />
            <TextInput label="Withdrawal" control={withdrawal} />
            <Checkbox label="Group" control={group} />
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
