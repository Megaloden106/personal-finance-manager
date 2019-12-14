import React, { FunctionComponent, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { fetchUserData } from '@/reducers/user';
import {
  fetchPortfolioList,
  setPortfolio,
  fetchPortfolioData,
  fetchAnalyticsData,
} from '@/reducers/portfolio';
import Sidebar from '@/components/Sidebar/Sidebar';
import Graph from '@/components/Graph/PortfolioGraphContainer';
import Analytics from '@/components/Analytics/Analytics';
import styles from './Portfolio.scss';

interface StateProps {
  portfolios: Portfolio[];
  id: string | null;
}

interface DispatchProps {
  initialize(): void;
  handlePortfolioClick(portfolio: Portfolio): void;
  getPortfolioData(id: string | number, params: PortfolioParam): void;
  getAnalyticsData(id: string): void;
}

type PortfolioProps = StateProps & DispatchProps;

const Portfolio: FunctionComponent<PortfolioProps> = ({
  id,
  portfolios,
  initialize,
  handlePortfolioClick,
  getPortfolioData,
  getAnalyticsData,
}) => {
  const [filter, setFilter] = useState<PortfolioFilter>({ time: '180D', data: 'Cumulative Returns' });

  useEffect(() => initialize(), []);

  useEffect(() => {
    if (id) {
      const params = { range: filter.time };

      getPortfolioData(id, params);
      getAnalyticsData(id);
    }
  }, [id, filter.time]);

  return (
    <div className={styles.container}>
      <Sidebar portfolios={portfolios} portfolioClick={handlePortfolioClick} />
      <Graph
        height={340}
        width={1056}
        filter={filter}
        filterClick={setFilter}
      />
      <Analytics />
    </div>
  );
};

const mapStateToProps = (state: AppState): StateProps => ({
  portfolios: state.portfolio.list,
  id: state.portfolio.id,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  initialize: () => {
    // TODO: move to Summary or Header page when complete
    dispatch(fetchUserData());
    dispatch(fetchPortfolioList());
  },
  handlePortfolioClick: (portfolio: Portfolio) => dispatch(setPortfolio(portfolio)),
  // TODO: move to Summary or Header page when complete
  getPortfolioData: (id: string, params) => dispatch(fetchPortfolioData(id, params)),
  getAnalyticsData: (id: string) => dispatch(fetchAnalyticsData(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
