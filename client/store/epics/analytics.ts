import { Epic, combineEpics } from 'redux-observable';
import { createEpic } from 'utils/action-util';
import * as AnalyticsAction from 'store/actions/analytics';
import * as AnalyticsService from 'store/services/analytics';

const requestAnalyticsTotalEpic = createEpic(
  AnalyticsAction.REQUEST_ANALYTICS_TOTAL,
  AnalyticsService.requestAnaltyicsTotal,
);

const requestAnalyticsAnnualizeEpic = createEpic(
  AnalyticsAction.REQUEST_ANALYTICS_ANNUALIZE,
  AnalyticsService.requestAnaltyicsAnnualize,
);

const requestAnalyticsPastYearEpic = createEpic(
  AnalyticsAction.REQUEST_ANALYTICS_PAST_YEAR,
  AnalyticsService.requestAnaltyicsPastYear,
);

export const analyticsEpic: Epic = combineEpics(
  requestAnalyticsTotalEpic,
  requestAnalyticsAnnualizeEpic,
  requestAnalyticsPastYearEpic,
);
