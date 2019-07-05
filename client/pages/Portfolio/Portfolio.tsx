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

const Portfolio: FunctionComponent<PortfolioProps> = ({ initialize }: PortfolioProps) => {
  useEffect(() => initialize(), []);

  return (
    <div className={styles.container}>
      <Sidebar />
      <Graph height={500} width={500} data={[]} />
      <Analytics />
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch): PortfolioProps => ({
  initialize: () => {
    dispatch(fetchUserData());
    dispatch(fetchPortfolio());
  },
});

export default connect(null, mapDispatchToProps)(Portfolio);
