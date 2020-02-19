import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from 'store/models/store';
import { useFormControl } from 'store/hooks/form/useFormControl';
import { portfolioListByNameSelector } from 'store/selectors/portfolios/PortfolioSelector';
import TextInput from 'components/Form/TextInput/TextInput';
import Select from 'components/Form/Select/Select';
import DatePicker from 'components/Form/DatePicker/DatePicker';

const defaultDropdown = 'Select';
const defaultText = '';

const DataPointForm: FC = () => {
  const portfolioListByName = useSelector(portfolioListByNameSelector);
  const dataPoint = useSelector((state: AppState) => state.sidepanel.dataPoint);

  const date = useFormControl(defaultDropdown);
  const portfolio = useFormControl(defaultDropdown);
  const balance = useFormControl<number | string>(defaultText);
  const deposit = useFormControl<number | string>(defaultText);
  const withdrawal = useFormControl<number | string>(defaultText);

  useEffect(() => {
    date.reset(dataPoint.date || defaultDropdown);
    portfolio.reset(dataPoint.portfolio || defaultDropdown);
    balance.reset(dataPoint.balance || defaultText);
    deposit.reset(dataPoint.deposit || defaultText);
    withdrawal.reset(dataPoint.withdrawal || defaultText);
  }, [dataPoint]);

  return (
    <>
      <DatePicker label="Date" control={date} />
      <Select label="Portfolio" control={portfolio} menuItems={portfolioListByName} />
      <TextInput label="Balance" control={balance}>
        <span>$</span>
      </TextInput>
      <TextInput label="Deposit" control={deposit}>
        <span>$</span>
      </TextInput>
      <TextInput label="Withdrawal" control={withdrawal}>
        <span>$</span>
      </TextInput>
    </>
  );
};

export default DataPointForm;
