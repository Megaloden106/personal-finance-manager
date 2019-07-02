import { combineReducers, Reducer } from 'redux';
import { combineEpics, Epic } from 'redux-observable';
import user, { userEpic, UserState } from './user';
import dropdown, { DropdownState } from './dropdown';

export interface AppState {
  user: UserState;
  dropdown: DropdownState;
}

export const rootEpic: Epic = combineEpics<Epic>(
  userEpic,
);

export const rootReducer: Reducer<AppState> = combineReducers<AppState>({
  user,
  dropdown,
});
