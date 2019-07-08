import React, { FunctionComponent, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { fetchUserData } from '@/reducers/user';
import { fetchPortfolio } from '@/reducers/portfolio';
import Sidebar from '@/components/Sidebar/Sidebar';
import Graph from '@/components/Graph/Graph';
import Analytics from '@/components/Analytics/Analytics';
import styles from './Portfolio.scss';

interface PortfolioProps {
  initialize(): void;
}

const Portfolio: FunctionComponent<PortfolioProps> = ({ initialize }) => {
  useEffect(() => initialize(), []);

  return (
    <div className={styles.container}>
      <Sidebar />
      <Graph height={340} width={1056} />
      <Analytics />
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch): PortfolioProps => ({
  initialize: () => {
    // TODO: move to Summary page when complete
    dispatch(fetchUserData());
    dispatch(fetchPortfolio());
    // TODO add init of single portfolio
  },
});

export default connect(null, mapDispatchToProps)(Portfolio);
