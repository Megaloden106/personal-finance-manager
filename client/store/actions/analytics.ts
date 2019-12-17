import { createAction } from '@/utils/action-util';

export const REQUEST_ANALYTICS_TOTAL = '[Analytics] Request Analytics Total';
export const REQUEST_ANALYTICS_TOTAL_SUCCESS = '[Analytics] Request Analytics Total Success';
export const REQUEST_ANALYTICS_TOTAL_ERROR = '[Analytics] Request Analytics Total Error';

export const requestAnalyticsTotal = (id: string) => createAction(REQUEST_ANALYTICS_TOTAL, id);

export const REQUEST_ANALYTICS_ANNUALIZE = '[Analytics] Request Analytics Annualize';
export const REQUEST_ANALYTICS_ANNUALIZE_SUCCESS = '[Analytics] Request Analytics Annualize Success';
export const REQUEST_ANALYTICS_ANNUALIZE_ERROR = '[Analytics] Request Analytics Annualize Error';

export const requestAnalyticsAnnualize = (id: string) => createAction(
  REQUEST_ANALYTICS_ANNUALIZE,
  id,
);

export const REQUEST_ANALYTICS_PAST_YEAR = '[Analytics] Request Analytics Past Year';
export const REQUEST_ANALYTICS_PAST_YEAR_SUCCESS = '[Analytics] Request Analytics Past Year Success';
export const REQUEST_ANALYTICS_PAST_YEAR_ERROR = '[Analytics] Request Analytics Past Year Error';

export const requestAnalyticsPastYear = (id: string) => createAction(
  REQUEST_ANALYTICS_PAST_YEAR,
  id,
);
