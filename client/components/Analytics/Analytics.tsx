import React, { FC } from 'react';
import { connect } from 'react-redux';
import styles from './Analytics.scss';
import AnalyticsCard from './Card/Card';
import { AppState } from '@/store/models/store';
import { AnalyticsCardSelector } from '@/store/selectors/analytics/AnalyticsSelector';
import { AnalyticsProps, StateProps } from './models/Analytics';


const Analytics: FC<AnalyticsProps> = ({ cards }) => (
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

const mapStateToProps = (state: AppState): StateProps => ({
  cards: AnalyticsCardSelector(state.analytics),
});

export default connect(mapStateToProps)(Analytics);
