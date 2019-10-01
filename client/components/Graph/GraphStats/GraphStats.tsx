import React, { FunctionComponent, memo } from 'react';
import { connect } from 'react-redux';
import { convertToMoney, convertToPercent } from '@/shared/util';
import styles from './GraphStats.scss';
import RollingNumber from '@/components/RollingNumber/RollingNumber';

interface ParentProps {
  filter: PortfolioFilter;
  start: number;
  balance: number;
  returns: number;
  date: string;
}

interface StateProps {
  name: string | null;
}

type GraphStatsProps = StateProps & ParentProps;

const GraphStats: FunctionComponent<GraphStatsProps> = ({
  filter,
  start,
  name,
  balance,
  returns,
  date,
}) => {
  const data = filter.data === 'Balance' ? balance - start : returns;
  const percentage = data / start * 100;

  return (
    <>
      <h1 className={styles.name}>{name}</h1>
      <h1 className={styles.balance}>
        <RollingNumber nextValue={balance} formatter={convertToMoney} />
      </h1>
      <h5 className={
        [
          styles.returns,
          data > 0 ? styles.returnsPos : undefined,
          data < 0 ? styles.returnsNeg : undefined,
        ].join(' ')}
      >
        <RollingNumber nextValue={data} formatter={convertToMoney} />
        <span>&nbsp;(</span>
        <RollingNumber nextValue={percentage} formatter={convertToPercent} />
        <span>)</span>
        {date && (
          <span className={styles.date}>
            &nbsp;On&nbsp;
            {date}
          </span>
        )}
      </h5>
    </>
  );
};

const mapStateToProps = (state: AppState): StateProps => ({
  name: state.portfolio.name,
});

export default connect(mapStateToProps)(memo(GraphStats));
