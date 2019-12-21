import { AnalyticsCardDetail } from '@/store/selectors/analytics/models/AnalyticsCardDetail';

export interface StateProps {
  cards: AnalyticsCardDetail[];
}

export type AnalyticsProps = StateProps;
