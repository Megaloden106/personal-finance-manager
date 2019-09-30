import React, { FunctionComponent } from 'react';
import { convertToMoney } from '@/shared/util';
import styles from './PortfolioList.scss';

interface PortfolioListProps {
  list: Portfolio[];
  title: string | void;
  setPortfolio(portfolio: Portfolio): void;
}

const PortfolioList: FunctionComponent<PortfolioListProps> = ({ list, title, setPortfolio }) => (
  <>
    {title && (
      <div className={styles.header}>
        <h3>{title}</h3>
      </div>
    )}
    {list.map((item: Portfolio) => {
      const returns = convertToMoney(item.returns);
      const balance = convertToMoney(item.balance);

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
          onClick={() => setPortfolio(item)}
        >
          <div>
            <div className={styles.detail}>{item.name}</div>
            {title && (
              <div className={styles.subDetail}>{item.brokerage.toUpperCase()}</div>
            )}
          </div>
          <div className={styles.amount}>
            <div className={styles.detail}>{balance}</div>
            <div className={colorClass}>{returns}</div>
          </div>
        </button>
      );
    })}
  </>
);

export default PortfolioList;
