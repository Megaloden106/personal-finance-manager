import React, { FC } from 'react';
import RollingNumber from '@/components/RollingNumber/RollingNumber';
import styles from './Card.scss';

interface Data {
  label: string;
  value: number;
  formatter?: (value: number) => string;
}

interface AnalyticsCardProps {
  title: string;
  details: Data[];
}

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
