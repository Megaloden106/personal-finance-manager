import React, { SFC, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Sidebar from '@/components/Sidebar/Sidebar';
import Graph from '@/components/Graph/Graph';
import Analytics from '@/components/Analytics/Analytics';
import Filter from '@/components/Filter/Filter';
import { fetchUserData } from '@/reducers/user';
import styles from './Portfolio.scss';

interface PortfolioProp {
  initialize: Function;
}

const Portfolio: SFC<PortfolioProp> = ({ initialize }: PortfolioProp) => {
  useEffect(() => initialize(), []);

  return (
    <div className={styles.container}>
      <Sidebar />
      <Graph />
      <Analytics />
      <Filter />
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  initialize: () => dispatch(fetchUserData()),
});

export default connect(null, mapDispatchToProps)(Portfolio);
