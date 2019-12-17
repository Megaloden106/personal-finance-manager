import { Reducer, combineReducers } from 'redux';
import { AppState } from '@/store/models/store';
import { userReducer as user } from './user';
import { portfolioReducer as portfolio } from './portfolio';
import { analyticsReducer as analytics } from './analytics';

export const rootReducer: Reducer<AppState> = combineReducers({
  user,
  portfolio,
  analytics,
});
