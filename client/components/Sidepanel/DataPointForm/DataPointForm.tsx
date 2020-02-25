import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { portfolioListByNameSelector } from 'store/selectors/portfolios/PortfolioSelector';
import TextInput from 'components/Form/TextInput/TextInput';
import Select from 'components/Form/Select/Select';
import DatePicker from 'components/Form/DatePicker/DatePicker';
import { FormControl } from 'store/models/form';

interface DataPointFormProps {
  controls: {
    portfolio: FormControl<string>;
    date: FormControl<string>;
    balance: FormControl<string>;
    deposit: FormControl<string>;
    withdrawal: FormControl<string>;
  };
}

const DataPointForm: FC<DataPointFormProps> = ({ controls }) => {
  const {
    portfolio,
    date,
    balance,
    deposit,
    withdrawal,
  } = controls;
  const portfolioListByName = useSelector(portfolioListByNameSelector);

  return (
    <>
      <Select label="Portfolio" control={portfolio} menuItems={portfolioListByName} />
      <DatePicker label="Date" control={date} />
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
