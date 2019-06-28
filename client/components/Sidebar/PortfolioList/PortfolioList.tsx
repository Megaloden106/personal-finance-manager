import React, { SFC } from 'react';
import { Portfolio } from '@/reducers/user';
import styles from './PortfolioList.scss';

interface PortfolioListProp {
  list: Portfolio[];
  title: string | void;
}

const PortfolioList: SFC<PortfolioListProp> = ({ list, title }) => (
  <>
    {title && (
      <div className={styles.header}>
        <h3>{title}</h3>
      </div>
    )}
    {list.map((item: Portfolio) => {
      const returns = item.returns > 0
        ? `+${item.returns.toLocaleString()}`
        : item.returns.toLocaleString();
      const colorClass = item.returns > 0
        ? styles['sub-detail--pos']
        : item.returns < 0
          ? styles['sub-detail--neg']
          : styles['sub-detail--neutral'];

      return (
        <div className={styles.portfolio}>
          <div>
            <div className={styles.detail}>{item.name}</div>
            {title && (
              <div className={styles.subDetail}>{item.brokerage}</div>
            )}
          </div>
          <div className={styles.amount}>
            <div className={styles.detail}>{`${item.balance.toLocaleString()}$`}</div>
            <div className={colorClass}>{`(${returns}$)`}</div>
          </div>
        </div>
      );
    })}
  </>
);

export default PortfolioList;
