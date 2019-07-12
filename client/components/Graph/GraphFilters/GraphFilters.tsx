import React, { FunctionComponent, memo } from 'react';
import styles from './GraphFilters.scss';

interface GraphFiltersProps {
  filter: PortfolioFilter;
  setFilter: (filter: PortfolioFilter) => void;
}

const GraphFilters: FunctionComponent<GraphFiltersProps> = ({ filter, setFilter }) => {
  const timeFilters = ['30D', '90D', '180D', '1Y', '5Y', '10Y', 'YTD', 'All'];
  const dataFilters = ['Balance', 'Returns', 'Transfers'];

  return (
    <div className={styles.filter}>
      <nav className={styles.filterTime}>
        <ul>
          {timeFilters.map((tf: string) => (
            <li
              key={tf}
              className={tf === filter.time ? styles.selected : undefined}
            >
              <button type="button" onClick={() => setFilter({ ...filter, time: tf })}>
                {tf}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <nav className={styles.filterData}>
        <ul>
          {dataFilters.map((df: string) => (
            <li
              key={df}
              className={df === filter.data ? styles.selected : undefined}
            >
              <button type="button" onClick={() => setFilter({ ...filter, data: df })}>
                {df}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default memo(GraphFilters);
