import React, { FC, useEffect, useState } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
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
import { PortfolioProps, StateProps, DispatchProps } from './models/Portfolio';
import styles from './Portfolio.scss';
import { convertToMoney, convertToPercent } from '@/utils/util';
import Overview from './Overview/Overview';

const Portfolio: FC<PortfolioProps> = ({
  id,
  portfolios,
  name,
  data,
  onInit,
  getPortfolioData,
  getAnalyticsData,
}) => {
  const [filter, setFilter] = useState<PortfolioParam>({
    range: '180D',
    data: 'Cumulative Returns',
  });
  const [balance, setBalance] = useState<number>(0);
  const [returns, setReturns] = useState<number>(0);
  const [percentage, setPercentage] = useState<number>(0);
  const [date, setDate] = useState<string>('');

  const setNext = (next: PortfolioData, newDate: string = '') => {
    const start = data[0];
    const nextReturns = next.cumulativeReturns - start.cumulativeReturns;
    setBalance(next.balance);
    setReturns(nextReturns);
    setPercentage(nextReturns / start.balance * 100);
    setDate(newDate);
  };

  useEffect(onInit, []);

  useEffect(() => {
    if (id) {
      const portfolio = _.find(portfolios, { id });
      getPortfolioData(portfolio, { range: filter.range });
      getAnalyticsData(id);
    }
  }, [id, filter.range]);

  return (
    <div className={styles.portfolio}>
      <Sidebar portfolioClick={getPortfolioData} />
      <div className={styles.graph}>
        <Overview
          name={name}
          balance={balance}
          returns={returns}
          percentage={percentage}
          date={date}
        />
        <Graph
          height={340}
          width={1064}
          filter={filter}
          data={data}
          setNext={setNext}
        />
        <FilterBar filter={filter} filterClick={setFilter} />
      </div>
      <Analytics />
    </div>
  );
};

const mapStateToProps = (state: AppState): StateProps => ({
  portfolios: state.portfolio.list,
  id: state.portfolio.selected.id,
  data: state.portfolio.selected.data,
  name: state.portfolio.selected.name,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  onInit: () => {
    dispatch(userDataAction());
    dispatch(portfolioListAction());
  },
  getPortfolioData: (portfolio, params) => dispatch(selectedPortfolioAction(portfolio, params)),
  getAnalyticsData: (id: string) => {
    dispatch(analyticsTotalAction(id));
    dispatch(analyticsAnnualizeAction(id));
    dispatch(analyticsPastYearAction(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
