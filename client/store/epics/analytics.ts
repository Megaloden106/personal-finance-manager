import { Epic, combineEpics } from 'redux-observable';
import { createEpic } from 'utils/action-util';
import * as AnalyticsAction from 'store/actions/analytics';
import * as AnalyticsService from 'store/services/analytics';

const requestAnalyticsEpic = createEpic(
  AnalyticsAction.REQUEST_ANALYTICS,
  AnalyticsService.requestAnaltyics,
);

export const analyticsEpic: Epic = combineEpics(
  requestAnalyticsEpic,
);
