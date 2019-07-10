import React, { FunctionComponent, memo } from 'react';
import { connect } from 'react-redux';
import { convertToMoney, convertToPercent } from '@/services/formatter';
import styles from './GraphStats.scss';

interface ParentProps {
  balance: number;
  returns: number;
  percentage: number;
  date: string;
}

interface StateProps {
  name: string | null;
}

type GraphStatsProps = StateProps & ParentProps;

const GraphStats: FunctionComponent<GraphStatsProps> = ({
  name,
  balance,
  returns,
  percentage,
  date,
}) => (
  <>
    <h1 className={styles.name}>{name}</h1>
    <h1 className={styles.balance}>{convertToMoney(balance)}</h1>
    <h5 className={
      [
        styles.returns,
        returns > 0 ? styles.returnsPos : undefined,
        returns < 0 ? styles.returnsNeg : undefined,
      ].join(' ')}
    >
      {`${convertToMoney(returns)} (${convertToPercent(percentage)})`}
      {date && (
        <span className={styles.date}>
          &nbsp;On&nbsp;
          {date}
        </span>
      )}
    </h5>
  </>
);

const mapStateToProps = (state: AppState): StateProps => ({
  name: state.portfolio.name,
});

export default connect(mapStateToProps)(memo(GraphStats));
