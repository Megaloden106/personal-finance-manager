import { UserState } from './user';
import { PortfolioState } from './portfolio';
import { AnalyticsState } from './analytics';
import { SidepanelState } from './sidepanel';

export interface AppState {
  user: UserState;
  portfolio: PortfolioState;
  analytics: AnalyticsState;
  sidepanel: SidepanelState;
}
