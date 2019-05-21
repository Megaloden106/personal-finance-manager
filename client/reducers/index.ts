import { combineReducers, Reducer } from 'redux';
import { combineEpics, Epic } from 'redux-observable';

export interface AppState {} // eslint-disable-line

export const rootEpic: Epic = combineEpics<Epic>();

export const rootReducer: Reducer<AppState> = combineReducers<AppState>({});
