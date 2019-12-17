export interface PortfolioState {
  readonly list: Portfolio[];
  readonly selected: {
    readonly name: string | null;
    readonly id: string | null;
    readonly data: PortfolioData[];
  };
}

export interface Portfolio {
  id: number;
  name: string;
  brokerage: string;
  balance: number;
  returns: number;
  isGroup: boolean;
  isRetirement: boolean;
  isSavings: boolean;
}

export interface PortfolioData {
  date: Date;
  balance: number;
  transfers: number;
  returns: number;
  cumulativeReturns: number;
  [propName: string]: number | Date;
}

export interface PortfolioParam {
  range?: string;
}
