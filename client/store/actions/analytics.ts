import { createAction } from 'utils/action-util';

export const REQUEST_ANALYTICS = '[Analytics] Request Analytics';
export const REQUEST_ANALYTICS_SUCCESS = '[Analytics] Request Analytics Success';
export const REQUEST_ANALYTICS_ERROR = '[Analytics] Request Analytics Error';

export const getAnalyticsAction = (id: string) => createAction(REQUEST_ANALYTICS, id);
