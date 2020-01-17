import { convertToMoney, convertToPercent, convertToCamelCase } from '@/utils/util';
import { AnalyticsCardDetail } from './models/AnalyticsCardDetail';
import { AppState } from '@/store/models/store';
import * as _ from '@/utils/collection-util';

const cards: AnalyticsCardDetail[] = [
  {
    title: 'Total',
    details: [
      { label: 'Balance', value: 0, formatter: convertToMoney },
      { label: 'Cash Flow', value: 0, formatter: convertToMoney },
      { label: 'Returns', value: 0, formatter: convertToMoney },
    ],
  },
  {
    title: 'Annualize',
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

export const AnalyticsCardSelector = (state: AppState): AnalyticsCardDetail[] => {
  const { analytics } = state;

  return cards.map(({ title, details }) => {
    const analyticsType = convertToCamelCase(title);

    const newDetails = details.map(({ label, formatter }) => {
      const detailType = convertToCamelCase(label);
      const value = _.get(analytics, [analyticsType, detailType]);

      return { label, value, formatter };
    });

    return { title, details: newDetails };
  });
};
