import { PortfolioSenarios } from './portfolio';
import { UserSenarios } from './user';

export * from './portfolio';
export * from './user';

export const scenarios: Scenario[] = [
  ...PortfolioSenarios,
  ...UserSenarios,
];
