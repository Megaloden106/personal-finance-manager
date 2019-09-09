import React, { FunctionComponent, memo } from 'react';
import styles from './GraphFilters.scss';

interface GraphFiltersProps {
  filter: PortfolioFilter;
  setFilter: (filter: PortfolioFilter) => void;
}

const GraphFilters: FunctionComponent<GraphFiltersProps> = ({ filter, setFilter }) => {
  const timeFilters = ['30D', '90D', '180D', '1Y', '5Y', '10Y', 'YTD', 'All'];
  // const dataFilters = ['Cumulative Returns', 'Balance'];

  return (
    <div className={styles.filter}>
      <div className={styles.filterTime}>
        {timeFilters.map((tf: string) => (
          <button
            type="button"
            key={tf}
            className={tf === filter.time ? styles.selected : undefined}
            onClick={() => setFilter({ ...filter, time: tf })}
          >
            {tf}
          </button>
        ))}
      </div>
      {/* <div className={styles.filterData}>
        {dataFilters.map((df: string) => (
          <button
            type="button"
            key={df}
            className={df === filter.data ? styles.selected : undefined}
            onClick={() => setFilter({ ...filter, data: df })}
          >
            {df}
          </button>
        ))}
      </div> */}
    </div>
  );
};

export default memo(GraphFilters);
