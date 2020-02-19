import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from 'store/models/store';
import { useFormControl } from 'store/hooks/form/useFormControl';
// import { portfolioListByNameSelector } from 'store/selectors/portfolios/PortfolioSelector';
// import { IPortfolio } from 'store/models/portfolio';
import TextInput from 'components/Form/TextInput/TextInput';
import Select from 'components/Form/Select/Select';
import Checkbox from 'components/Form/Checkbox/Checkbox';
// import { find } from 'utils/collection-util';

const defaultDropdown = 'Select';
const defaultText = '';
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

const PortfolioForm: FC = () => {
  // const portfolioListByName = useSelector(portfolioListByNameSelector);
  const portfolioForm = useSelector((state: AppState) => state.sidepanel.portfolio);
  // const portfolioList = useSelector((state: AppState) => state.portfolio.list);

  const portfolio = useFormControl(defaultDropdown);
  const name = useFormControl<number | string>(defaultText);
  const brokerage = useFormControl(defaultDropdown);
  const retirement = useFormControl(false);
  const savings = useFormControl(false);

  useEffect(() => {
    portfolio.patchValue(defaultDropdown);
    name.patchValue(portfolioForm.name || defaultText);
    brokerage.patchValue(portfolioForm.brokerage || defaultDropdown);
    retirement.patchValue(portfolioForm.isRetirement);
    savings.patchValue(portfolioForm.isSavings);
  }, [portfolioForm]);

  // useEffect(() => {
  //   if (portfolio.value !== defaultDropdown) {
  //     const selectedPortfolio: IPortfolio = find(portfolioList, { name: portfolio.value });
  //     name.patchValue(selectedPortfolio.name);
  //     brokerage.patchValue(selectedPortfolio.brokerage);
  //     retirement.patchValue(selectedPortfolio.isRetirement);
  //     savings.patchValue(selectedPortfolio.isSavings);
  //   }
  // }, [portfolio.value]);

  return (
    <>
      {/* <Select label="Edit Portfolio" control={portfolio} menuItems={portfolioListByName} /> */}
      <TextInput label="Name" control={name} />
      <Select label="Brokerage" control={brokerage} menuItems={brokerageList} />
      <Checkbox label="Retirement" control={retirement} />
      <Checkbox label="Savings" control={savings} />
    </>
  );
};

export default PortfolioForm;
