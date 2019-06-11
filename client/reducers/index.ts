import { combineReducers, Reducer } from 'redux';
import { combineEpics, Epic } from 'redux-observable';
import user, { userEpic, UserState } from './user';

export interface AppState {
  user: UserState;
}

export const rootEpic: Epic = combineEpics<Epic>(
  userEpic,
);

export const rootReducer: Reducer<AppState> = combineReducers<AppState>({
  user,
});
