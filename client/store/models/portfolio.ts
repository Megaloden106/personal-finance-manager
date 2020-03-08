export interface PortfolioState {
  readonly list: IPortfolio[];
  readonly filter: PortfolioParam;
  readonly selected: {
    readonly name: string;
    readonly id: string;
    readonly data: PortfolioData[];
  };
}

export interface IPortfolio {
  id: string;
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
  balance?: number;
  transfers?: number;
  returns?: number;
  cumulativeReturns?: number;
  [propName: string]: number | Date;
}

// TODO: switch to enum
export interface PortfolioParam {
  range?: string;
  data?: string;
}

export interface PortfolioByType {
  type: string;
  portfolios: IPortfolio[];
  label?: string;
}
