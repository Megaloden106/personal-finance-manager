import { UserState } from './user';
import { PortfolioState } from './portfolio';
import { AnalyticsState } from './analytics';

export interface AppState {
  user: UserState;
  portfolio: PortfolioState;
  anayltics: AnalyticsState;
}
