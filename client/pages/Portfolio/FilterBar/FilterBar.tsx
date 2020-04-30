import React, { FC } from 'react';
import { PortfolioParam } from 'store/models/portfolio';
import styles from './FilterBar.scss';

interface FilterBarProps {
  filter: PortfolioParam;
  filterClick(filter: PortfolioParam): void;
}

const FilterBar: FC<FilterBarProps> = ({ filter, filterClick }) => {
  const timeFilters = ['30D', '90D', '180D', '1Y', '5Y', '10Y', 'YTD', 'All'];
  const dataFilters = ['Cumulative Returns'];

  return (
    <div className={styles.filter}>
      <div className={styles.filterTime}>
        {timeFilters.map((tf: string) => (
          <button
            type="button"
            key={tf}
            className={tf === filter.range ? styles.selected : undefined}
            onClick={() => filterClick({ ...filter, range: tf })}
          >
            {tf}
          </button>
        ))}
      </div>
      <div className={styles.filterData}>
        {dataFilters.map((df: string) => (
          <button
            type="button"
            key={df}
            className={df === filter.data ? styles.selected : undefined}
            onClick={() => filterClick({ ...filter, data: df })}
          >
            {df}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;
