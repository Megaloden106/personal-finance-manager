import React, { FC, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styles from './Analytics.scss';
import AnalyticsCard from './Card/Card';
import { convertToMoney, convertToPercent, convertToCamelCase } from '@/shared/util';

interface StateProps {
  analytics: AnalyticsData;
}

interface Data {
  label: string;
  value: number;
  formatter?: (value: number) => string;
}

interface AnalyticsCardProps {
  title: string;
  details: Data[];
}

type AnalyticsProps = StateProps;

const initialCards: AnalyticsCardProps[] = [
  {
    title: 'Total',
    details: [
      { label: 'Balance', value: 0, formatter: convertToMoney },
      { label: 'Cash Flow', value: 0, formatter: convertToMoney },
      { label: 'Returns', value: 0, formatter: convertToMoney },
    ],
  },
  {
    title: 'Annual',
    details: [
      { label: 'Returns', value: 0, formatter: convertToMoney },
      { label: 'Rate of Return', value: 0, formatter: convertToPercent },
      { label: 'Cash Flow', value: 0, formatter: convertToMoney },
    ],
  },
  {
    title: 'Past Year',
    details: [
      { label: 'Returns', value: 0, formatter: convertToMoney },
      { label: 'Rate of Return', value: 0, formatter: convertToPercent },
      { label: 'Cash Flow', value: 0, formatter: convertToMoney },
    ],
  },
];

const Analytics: FC<AnalyticsProps> = ({ analytics }) => {
  const [cards, setCards] = useState<AnalyticsCardProps[]>(initialCards);

  useEffect(() => {
    const updatedCards = cards.map(({ title, details }) => {
      const analyticsType = convertToCamelCase(title);

      const newDetails = details.map(({ label, formatter }) => {
        const detailType = convertToCamelCase(label);
        const value = analytics[analyticsType]
          ? analytics[analyticsType][detailType]
          : 0;

        return { label, value, formatter };
      });

      return { title, details: newDetails };
    });

    setCards(updatedCards);
  }, [analytics]);

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

const mapStateToProps = (state: AppState): StateProps => ({
  analytics: state.portfolio.analytics,
});

export default connect(mapStateToProps)(Analytics);
