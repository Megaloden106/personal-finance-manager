import React, { FC } from 'react';
import RollingNumber from 'components/RollingNumber/RollingNumber';
import { AnalyticsCardDetail } from 'store/models/analytics';
import styles from './Card.scss';


const AnalyticsCard: FC<AnalyticsCardDetail> = ({ title, details }) => (
  <div className={styles.card}>
    <h2>{title}</h2>
    {details.map(({ label, value, formatter }) => (
      <div key={label}>
        <p>{label}</p>
        <p><RollingNumber nextValue={value} formatter={formatter} /></p>
      </div>
    ))}
  </div>
);

export default AnalyticsCard;
