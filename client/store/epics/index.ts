import { Epic, combineEpics } from 'redux-observable';
import { userEpic } from './user';
import { portfolioEpic } from './portfolio';
import { analyticsEpic } from './analytics';

export const rootEpic: Epic = combineEpics(
  userEpic,
  portfolioEpic,
  analyticsEpic,
);
