import { Epic, combineEpics } from 'redux-observable';
import { userEpic } from './user';
import { portfolioEpic } from './portfolio';

export const rootEpic: Epic = combineEpics(
  userEpic,
  portfolioEpic,
);
