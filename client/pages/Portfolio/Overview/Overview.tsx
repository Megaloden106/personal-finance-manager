import React, { FC } from 'react';
import RollingNumber from 'components/RollingNumber/RollingNumber';
import { convertToMoney, convertToPercent } from 'utils/util';
import styles from './Overview.scss';
import { OverviewProps } from './Overview.models';

const Overview: FC<OverviewProps> = ({
  name,
  balance,
  returns,
  percentage,
  date,
}) => (
  <div>
    <h2 className={styles.name}>{name}</h2>
    <p className={styles.balance}>
      <RollingNumber nextValue={balance} formatter={convertToMoney} />
    </p>
    <p className={
      [
        styles.returns,
        returns > 0 ? styles.returnsPos : undefined,
        returns < 0 ? styles.returnsNeg : undefined,
      ].join(' ')}
    >
      <RollingNumber nextValue={returns} formatter={convertToMoney} />
      &nbsp;(
      <RollingNumber nextValue={percentage} formatter={convertToPercent} />
      )
      {date && (
        <span className={styles.date}>
          &nbsp;On&nbsp;
          {date}
        </span>
      )}
    </p>
  </div>
);

export default Overview;
