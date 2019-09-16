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

interface PortfolioData {
  date: Date;
  balance: number;
  transfers: number;
  returns: number;
  cumulativeReturns: number;
}

interface PortfolioFilter {
  time: string;
  data: string;
}
