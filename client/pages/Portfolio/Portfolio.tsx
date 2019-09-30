import React, { FunctionComponent, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { fetchUserData } from '@/reducers/user';
import { fetchPortfolioList, setPortfolio } from '@/reducers/portfolio';
import Sidebar from '@/components/Sidebar/Sidebar';
import Graph from '@/components/Graph/Graph';
import Analytics from '@/components/Analytics/Analytics';
import styles from './Portfolio.scss';

interface PortfolioProps {
  initialize(): void;
  handleSetPortfolio(portfolio: Portfolio): void;
}

const Portfolio: FunctionComponent<PortfolioProps> = ({ initialize, handleSetPortfolio }) => {
  useEffect(() => initialize(), []);

  return (
    <div className={styles.container}>
      <Sidebar setPortfolio={handleSetPortfolio} />
      <Graph height={340} width={1056} />
      <Analytics />
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch): PortfolioProps => ({
  initialize: () => {
    // TODO: move to Summary page when complete
    dispatch(fetchUserData());
    dispatch(fetchPortfolioList());
  },
  handleSetPortfolio: (portfolio: Portfolio) => dispatch(setPortfolio(portfolio)),
});

export default connect(null, mapDispatchToProps)(Portfolio);
