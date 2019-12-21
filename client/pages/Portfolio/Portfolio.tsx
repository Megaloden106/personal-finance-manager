import React, { FC, useEffect, useState } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '@/store/models/store';
import { PortfolioParam } from '@/store/models/portfolio';
import { userDataAction } from '@/store/actions/user';
import { portfolioListAction, selectedPortfolioAction } from '@/store/actions/portfolio';
import { analyticsTotalAction, analyticsAnnualizeAction, analyticsPastYearAction } from '@/store/actions/analytics';
import * as _ from '@/utils/collection-util';
import Sidebar from '@/components/Sidebar/Sidebar';
import Graph from '@/components/Graph/PortfolioGraphContainer';
import Analytics from '@/components/Analytics/Analytics';
import styles from './Portfolio.scss';
import { PortfolioProps, StateProps, DispatchProps } from './models/Portfolio';

const Portfolio: FC<PortfolioProps> = ({
  id,
  portfolios,
  onInit,
  getPortfolioData,
  getAnalyticsData,
}) => {
  const [filter, setFilter] = useState<PortfolioParam>({
    range: '180D',
    data: 'Cumulative Returns',
  });

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
  id: state.portfolio.selected.id,
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
