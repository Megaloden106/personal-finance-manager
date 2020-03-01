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
import { useFormControl } from 'store/hooks/form/useFormControl';
import Portal from 'components/Portal/Portal';
import { Validation } from 'utils/validation';
import { FormGroup } from 'store/models/form';
import DataPointForm from './DataPointForm/DataPointForm';
import PortfolioForm from './PortfolioForm/PortfolioForm';
import styles from './Sidepanel.scss';

const defaultDropdown = 'Select';
const defaultText = '';

const reset = (form: FormGroup) => {
  Object.values(form).forEach((control) => {
    control.reset();
  });
};

const validate = (form: FormGroup) => {
  Object.values(form).forEach((control) => {
    control.validate();
  });
};

const Sidepanel: FC = () => {
  const isPanelOpen = useSelector((state: AppState) => state.sidepanel.isOpen);
  const selectedTab = useSelector((state: AppState) => state.sidepanel.selectedTab);
  const dispatch = useDispatch();
  const sidepanel = useRef(null);

  // const dataPointState = useSelector((state: AppState) => state.sidepanel.dataPoint);
  const date = useFormControl<string>(defaultDropdown, [Validation.RequiredDropdown]);
  const portfolio = useFormControl<string>(defaultDropdown, [Validation.RequiredDropdown]);
  const balance = useFormControl<string>(defaultText, [
    Validation.Required,
    Validation.Currency,
    Validation.MaxLength(75),
  ]);
  const deposit = useFormControl<string>(defaultText, [
    Validation.Required,
    Validation.Currency,
    Validation.MaxLength(75),
  ]);
  const withdrawal = useFormControl<string>(defaultText, [
    Validation.Required,
    Validation.Currency,
    Validation.MaxLength(75),
  ]);
  const dataPointForm = {
    date,
    portfolio,
    balance,
    deposit,
    withdrawal,
  };

  // const portfolioState = useSelector((state: AppState) => state.sidepanel.portfolio);
  const name = useFormControl<string>(defaultText, [Validation.Required, Validation.MaxLength(75)]);
  const brokerage = useFormControl<string>(defaultDropdown, [Validation.RequiredDropdown]);
  const retirement = useFormControl(false);
  const savings = useFormControl(false);
  const portfolioForm = {
    name,
    brokerage,
    retirement,
    savings,
  };

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
    const form = selectedTab === SidepanelTab.DataPoint ? dataPointForm : portfolioForm;
    reset(form);
    dispatch(updateSidepanelStatusAction(false));
  }, [selectedTab]);

  const onAdd = useCallback((event: MouseEvent) => {
    const form = selectedTab === SidepanelTab.DataPoint ? dataPointForm : portfolioForm;
    validate(form);
    event.preventDefault();
  }, [selectedTab]);

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
              <DataPointForm controls={dataPointForm} />
            ) : (
              <PortfolioForm controls={portfolioForm} />
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
