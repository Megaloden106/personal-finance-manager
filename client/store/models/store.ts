import { UserState } from './user';
import { PortfolioState } from './portfolio';
import { AnalyticsState } from './analytics';
import { SidepanelState } from './sidepanel';

export interface AppState {
  readonly user: UserState;
  readonly portfolio: PortfolioState;
  readonly analytics: AnalyticsState;
  readonly sidepanel: SidepanelState;
}
