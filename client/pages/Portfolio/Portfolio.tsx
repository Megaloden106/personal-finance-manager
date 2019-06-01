import React, { SFC } from 'react';
import Sidebar from '@/components/Sidebar/Sidebar';
import Graph from '@/components/Graph/Graph';
import Analytics from '@/components/Analytics/Analytics';
import Filter from '@/components/Filter/Filter';
import styles from './Portfolio.scss';

const Portfolio: SFC = () => (
  <div className={styles.container}>
    <Sidebar />
    <Graph />
    <Analytics />
    <Filter />
  </div>
);

export default Portfolio;
