import React, { FC, useEffect, useRef } from 'react';
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
import Portal from '../Portal/Portal';
import styles from './Sidepanel.scss';
import Checkbox from '../Form/Checkbox/Checkbox';

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

  return (
    <Portal>
      <div
        ref={sidepanel}
        className={getClassName({
          [styles.sidepanel]: true,
          [styles.sidepanelOpen]: isPanelOpen,
        })}
      >
        <form className={styles.form} onSubmit={e => e.preventDefault()}>
          <DatePicker label="Date" control={date} />
          <Select label="Portfolio" control={portfolio} menuItems={portfolioListByName} />
          <TextInput label="Balance" control={balance} />
          <TextInput label="Deposit" control={deposit} />
          <TextInput label="Withdrawal" control={withdrawal} />
          <Checkbox label="Group" control={group} />
        </form>
      </div>
    </Portal>
  );
};

export default Sidepanel;
