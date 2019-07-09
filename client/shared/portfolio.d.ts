interface Portfolio {
  id: number;
  name: string;
  brokerage: string;
  balance: number;
  returns: number;
  isGroup: boolean;
  isRetirement: boolean;
  isSavings: boolean;
}

interface PortfolioEntry {
  date: Date;
  balance: number;
  transfers: number;
  returns: number;
  cumulativeReturns: number;
  [propName: string]: number | Date;
}

interface Cumulative {
  [propName: string]: number;
}

interface PortfolioFilter {
  time: string;
  data: string;
}
