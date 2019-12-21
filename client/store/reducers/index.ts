import { Reducer, combineReducers } from 'redux';
import { AppState } from '@/store/models/store';
import { userReducer } from './user';
import { portfolioReducer } from './portfolio';
import { analyticsReducer } from './analytics';

export const rootReducer: Reducer<AppState> = combineReducers({
  user: userReducer,
  portfolio: portfolioReducer,
  analytics: analyticsReducer,
});
