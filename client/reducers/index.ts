import { combineReducers, Reducer } from 'redux';
import { combineEpics, Epic } from 'redux-observable';
import user, { userEpic } from './user';
import dropdown from './dropdown';

export const rootEpic: Epic = combineEpics<Epic>(
  userEpic,
);

export const rootReducer: Reducer<AppState> = combineReducers<AppState>({
  user,
  dropdown,
});
