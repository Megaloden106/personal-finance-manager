export interface AnalyticsState {
  readonly total: TotalAnalytics;
  readonly annualize: AnnualizeAnalytics;
  readonly pastYear: PastYearAnalytics;
}

export interface TotalAnalytics {
  balance: number;
  cashFlow: number;
  returns: number;
}

export interface AnnualizeAnalytics {
  returns: number;
  rateOfReturn: number;
  cashFlow: number;
}

export interface PastYearAnalytics {
  returns: number;
  rateOfReturn: number;
  cashFlow: number;
}
