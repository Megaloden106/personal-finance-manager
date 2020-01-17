import React, { FC, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '@/store/models/store';
import { PortfolioParam, PortfolioData } from '@/store/models/portfolio';
import { userDataAction } from '@/store/actions/user';
import { portfolioListAction, selectedPortfolioAction } from '@/store/actions/portfolio';
import { analyticsTotalAction, analyticsAnnualizeAction, analyticsPastYearAction } from '@/store/actions/analytics';
import * as _ from '@/utils/collection-util';
import Sidebar from '@/components/Sidebar/Sidebar';
import Graph from '@/components/Graph/Graph';
import Analytics from '@/components/Analytics/Analytics';
import FilterBar from '@/components/FilterBar/FilterBar';
import styles from './Portfolio.scss';
import Overview from './Overview/Overview';
import { getClassName } from '@/utils/react-util';
import CircleMenu from '@/components/CircleMenu/CircleMenu';

const initialFilter = {
  range: '180D',
  data: 'Cumulative Returns',
};

const Portfolio: FC = () => {
  const portfolios = useSelector((state: AppState) => state.portfolio.list);
  const id = useSelector((state: AppState) => state.portfolio.selected.id);
  const data = useSelector((state: AppState) => state.portfolio.selected.data);
  const name = useSelector((state: AppState) => state.portfolio.selected.name);
  const dispatch = useDispatch();

  const [filter, setFilter] = useState<PortfolioParam>(initialFilter);
  const [balance, setBalance] = useState<number>(0);
  const [returns, setReturns] = useState<number>(0);
  const [percentage, setPercentage] = useState<number>(0);
  const [date, setDate] = useState<string>('');
  const [isMenuOpen, setMenu] = useState<boolean>(false);


  /* componentDidMount */
  useEffect(() => {
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
  }, [id, filter.range]);

  const setNext = (next: PortfolioData, newDate: string = '') => {
    const start = data[0];
    const nextReturns = next.cumulativeReturns - start.cumulativeReturns;
    setBalance(next.balance);
    setReturns(nextReturns);
    setPercentage(nextReturns / start.balance * 100);
    setDate(newDate);
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
          <button
            type="button"
            id="circle-menu-anchor"
            className={getClassName({
              [styles.menu]: true,
              [styles.menuOpen]: isMenuOpen,
            })}
            onClick={() => setMenu(!isMenuOpen)}
          >
            <span />
            <span />
            <span />
          </button>
          <CircleMenu
            anchorId="circle-menu-anchor"
            isOpen={isMenuOpen}
            setMenu={setMenu}
          />
        </div>
        <Graph
          height={340}
          width={1064}
          filter={filter}
          data={data}
          interactive
          setNext={setNext}
        />
        <FilterBar filter={filter} filterClick={setFilter} />
      </div>
      <Analytics />
    </div>
  );
};

export default Portfolio;
