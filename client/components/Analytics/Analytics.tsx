import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import styles from './Analytics.scss';
import AnalyticsCard from './Card/Card';
import { AnalyticsCardSelector } from '@/store/selectors/analytics/AnalyticsSelector';

const Analytics: FC = () => {
  const cards = useSelector(AnalyticsCardSelector);

  return (
    <div className={styles.analytics}>
      {cards.map(({ title, details }) => (
        <AnalyticsCard
          title={title}
          details={details}
          key={title}
        />
      ))}
    </div>
  );
};

export default Analytics;
