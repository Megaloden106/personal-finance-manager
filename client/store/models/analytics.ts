export interface AnalyticsState {
  readonly total: TotalAnalytic;
  readonly annualize: AnnualizeAnalytic;
  readonly pastYear: PastYearAnalytic;
}

export interface TotalAnalytic {
  balance: number;
  cashFlow: number;
  returns: number;
}

export interface AnnualizeAnalytic {
  returns: number;
  rateOfReturn: number;
  cashFlow: number;
}

export interface PastYearAnalytic {
  returns: number;
  rateOfReturn: number;
  cashFlow: number;
}

export interface AnalyticsCardDetail {
  title: string;
  details: {
    label: string;
    value: number;
    formatter?: (value: number) => string;
  }[];
}
