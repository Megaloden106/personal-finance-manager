import { combineReducers, Reducer } from 'redux';
import { combineEpics, Epic } from 'redux-observable';
import user, { userEpic } from './user';
import dropdown from './dropdown';
import portfolio, { portfolioEpic } from './portfolio';

export const rootEpic: Epic = combineEpics<Epic>(
  userEpic,
  portfolioEpic,
);

export const rootReducer: Reducer<AppState> = combineReducers<AppState>({
  user,
  dropdown,
  portfolio,
});
