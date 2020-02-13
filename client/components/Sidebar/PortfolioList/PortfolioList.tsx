import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import RollingNumber from 'components/RollingNumber/RollingNumber';
import { updateSelectedPortfolioAction } from 'store/actions/portfolio';
import { IPortfolio } from 'store/models/portfolio';
import { convertToMoney } from 'utils/util';
import { PortfolioListProps } from './PortfolioList.models';
import styles from './PortfolioList.scss';

const PortfolioList: FC<PortfolioListProps> = ({ portfolios, title }) => {
  const dispatch = useDispatch();

  return (
    <>
      {title && (
        <div className={styles.header}>
          <h3>{title}</h3>
        </div>
      )}
      {portfolios.map((portfolio: IPortfolio) => {
        const colorClass = portfolio.returns > 0
          ? styles.subDetailPos
          : portfolio.returns < 0
            ? styles.subDetailNeg
            : styles.subDetailNeutral;

        return (
          <button
            type="button"
            key={portfolio.id}
            className={styles.portfolio}
            onClick={() => dispatch(updateSelectedPortfolioAction(portfolio))}
          >
            <div>
              <div className={styles.detail}>{portfolio.name}</div>
              {title && (
                <div className={styles.subDetail}>{portfolio.brokerage.toUpperCase()}</div>
              )}
            </div>
            <div className={styles.amount}>
              <div className={styles.detail}>
                <RollingNumber nextValue={portfolio.balance} formatter={convertToMoney} />
              </div>
              <div className={colorClass}>
                <RollingNumber nextValue={portfolio.returns} formatter={convertToMoney} />
              </div>
            </div>
          </button>
        );
      })}
    </>
  );
};

export default PortfolioList;
