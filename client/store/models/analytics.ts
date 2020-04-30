export interface AnalyticsState {
  readonly deposits: number;
  readonly withdrawals: number;
  readonly gains: number;
  readonly returns: number;
  readonly marketGains: number;
  readonly dividendReturns: number;
  readonly annualizeReturns: number;
}
