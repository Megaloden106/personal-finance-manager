import React, { FC } from 'react';
import TextInput from 'components/Form/TextInput/TextInput';
import Select from 'components/Form/Select/Select';
import Checkbox from 'components/Form/Checkbox/Checkbox';
import { FormControl } from 'store/models/form';

const brokerageList = [
  'Ally Bank',
  'Charles Schwab',
  'E*Trade',
  'Fidelity',
  'Health Equity',
  'M1 Finance',
  'T Rowe Price',
  'Robinhood',
  'Vanguard',
  'Wells Fargo',
];

interface PortfolioFormProps {
  controls: {
    name: FormControl<string>;
    brokerage: FormControl<string>;
    retirement: FormControl<boolean>;
    savings: FormControl<boolean>;
  };
}

const PortfolioForm: FC<PortfolioFormProps> = ({ controls }) => {
  const {
    name,
    brokerage,
    retirement,
    savings,
  } = controls;

  return (
    <>
      <TextInput label="Name" control={name} />
      <Select label="Brokerage" control={brokerage} menuItems={brokerageList} />
      <Checkbox label="Retirement" control={retirement} />
      <Checkbox label="Savings" control={savings} />
    </>
  );
};

export default PortfolioForm;
