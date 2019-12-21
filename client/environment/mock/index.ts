import { PortfolioSenarios } from './portfolio';
import { UserSenarios } from './user';
import { AnalyticsScenarios } from './analytics';

export * from './portfolio';
export * from './user';
export * from './analytics';

export const scenarios: Scenario[] = [
  ...PortfolioSenarios,
  ...UserSenarios,
  ...AnalyticsScenarios,
];
