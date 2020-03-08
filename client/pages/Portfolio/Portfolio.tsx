import React, { FC, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from 'store/models/store';
import { PortfolioData, PortfolioParam } from 'store/models/portfolio';
import { userDataAction } from 'store/actions/user';
import { portfolioListAction, selectedPortfolioAction, updatePortfiolFilterAction } from 'store/actions/portfolio';
import { analyticsTotalAction, analyticsAnnualizeAction, analyticsPastYearAction } from 'store/actions/analytics';
import * as _ from 'utils/collection-util';
import FilterBar from 'pages/Portfolio/FilterBar/FilterBar';
import Graph from 'components/Graph/Graph';
import Sidebar from 'components/Sidebar/Sidebar';
import Sidepanel from 'components/Sidepanel/Sidepanel';
import Overview from './Overview/Overview';
import styles from './Portfolio.scss';

const Portfolio: FC = () => {
  const portfolios = useSelector((state: AppState) => state.portfolio.list);
  const filter = useSelector((state: AppState) => state.portfolio.filter);
  const id = useSelector((state: AppState) => state.portfolio.selected.id);
  const data = useSelector((state: AppState) => state.portfolio.selected.data);
  const name = useSelector((state: AppState) => state.portfolio.selected.name);
  const dispatch = useDispatch();

  const [balance, setBalance] = useState(0);
  const [returns, setReturns] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [date, setDate] = useState('');

  const setNext = (next: PortfolioData, newDate: string = '') => {
    const start = data[0];
    const nextReturns = next.cumulativeReturns - start.cumulativeReturns;
    setBalance(next.balance);
    setReturns(nextReturns);
    setPercentage(nextReturns / start.balance * 100);
    setDate(newDate);
  };

  /* componentDidMount */
  useEffect(() => {
    if (data.length) {
      setNext(data[data.length - 1]);
    }
    dispatch(userDataAction());
    dispatch(portfolioListAction());
  }, []);

  /* componentDidUpdate: id, filter.range */
  useEffect(() => {
    if (id) {
      const portfolio = _.find(portfolios, { id });
      dispatch(selectedPortfolioAction(portfolio, { range: filter.range }));
      dispatch(analyticsTotalAction(id));
      dispatch(analyticsAnnualizeAction(id));
      dispatch(analyticsPastYearAction(id));
    }
  }, [id, filter]);

  const onFilterClick = (newFilter: PortfolioParam) => {
    dispatch(updatePortfiolFilterAction(newFilter));
  };

  return (
    <div className={styles.portfolio}>
      <Sidebar />
      <div className={styles.graph}>
        <div className={styles.header}>
          <Overview
            name={name}
            balance={balance}
            returns={returns}
            percentage={percentage}
            date={date}
          />
        </div>
        <Graph
          height={340}
          width={824}
          filter={filter}
          data={data}
          interactive
          setNext={setNext}
        />
        <FilterBar filter={filter} filterClick={onFilterClick} />
      </div>
      <Sidepanel />
    </div>
  );
};

export default Portfolio;
