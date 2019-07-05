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
  deposit: number;
  withdrawal: number;
  returns: number;
  cumulativeReturns: number;
}

interface PortfolioFilter {
  time: string;
  data: string;
}
