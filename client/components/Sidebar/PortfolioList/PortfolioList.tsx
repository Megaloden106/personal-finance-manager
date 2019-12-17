import React, { FunctionComponent } from 'react';
import { convertToMoney } from '@/utils/util';
import styles from './PortfolioList.scss';
import RollingNumber from '@/components/RollingNumber/RollingNumber';

interface PortfolioListProps {
  list: Portfolio[];
  title: string | void;
  portfolioClick(portfolio: Portfolio): void;
}

const PortfolioList: FunctionComponent<PortfolioListProps> = ({
  list,
  title,
  portfolioClick,
}) => (
  <>
    {title && (
      <div className={styles.header}>
        <h3>{title}</h3>
      </div>
    )}
    {list.map((item: Portfolio) => {
      const colorClass = item.returns > 0
        ? styles.subDetailPos
        : item.returns < 0
          ? styles.subDetailNeg
          : styles.subDetailNeutral;

      return (
        <button
          type="button"
          key={item.id}
          className={styles.portfolio}
          onClick={() => portfolioClick(item)}
        >
          <div>
            <div className={styles.detail}>{item.name}</div>
            {title && (
              <div className={styles.subDetail}>{item.brokerage.toUpperCase()}</div>
            )}
          </div>
          <div className={styles.amount}>
            <div className={styles.detail}>
              <RollingNumber nextValue={item.balance} formatter={convertToMoney} />
            </div>
            <div className={colorClass}>
              <RollingNumber nextValue={item.returns} formatter={convertToMoney} />
            </div>
          </div>
        </button>
      );
    })}
  </>
);

export default PortfolioList;
