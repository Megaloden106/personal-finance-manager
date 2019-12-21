import React, { FC } from 'react';
import RollingNumber from '@/components/RollingNumber/RollingNumber';
import styles from './Card.scss';
import { AnalyticsCardProps } from './models/Card';


const AnalyticsCard: FC<AnalyticsCardProps> = ({ title, details }) => (
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
