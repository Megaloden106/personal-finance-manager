declare enum PortfolioActionType {
  FETCH_PORTFOLIO_LIST = '[Portfolio] Fetch Portfolio List',
  INIT_PORTFOLIO_LIST = '[Portfolio] Initialize Portfolio List',
  SET_PORTFOLIO = '[Portfolio] Set Portfolio',
  FETCH_PORTFOLIO_DATA = '[Portfolio] Fetch Portfolio Data',
  UPDATE_PORTFOLIO_DATA = '[Portfolio] Update Portfolio Data',
  FETCH_ANALYTICS_DATA = '[Portfolio] Fetch Analytics',
  UPDATE_ANALYTICS_DATA = '[Portfolio] Update Analytics',
}

interface PortfolioState {
  name: string | null;
  id: string | null;
  list: Portfolio[];
  data: PortfolioData[];
  analytics: AnalyticsData;
}

interface FetchPortfolioAction {
  type: PortfolioActionType.FETCH_PORTFOLIO_LIST;
}

interface InitPortfolioListAction {
  type: PortfolioActionType.INIT_PORTFOLIO_LIST;
  portfolios: PortfolioList;
}

interface FetchPortfolioDataAction {
  type: PortfolioActionType.FETCH_PORTFOLIO_DATA;
  id: string | number;
  params: PortfolioParam;
}

interface UpdatePortfolioDataAction {
  type: PortfolioActionType.UPDATE_PORTFOLIO_DATA;
  data: PortfolioData[];
}

interface SetPortfolioAction {
  type: PortfolioActionType.SET_PORTFOLIO;
  portfolio: Portfolio;
}

interface FetchAnalyticsDataAction {
  type: PortfolioActionType.FETCH_ANALYTICS_DATA;
  id: string;
}

interface UpdateAnalyticsDataAction {
  type: PortfolioActionType.UPDATE_ANALYTICS_DATA;
  data: AnalyticsData;
}

type PortfolioAction = FetchPortfolioAction |
InitPortfolioListAction |
FetchPortfolioDataAction |
UpdateDataAction |
setPortfolioAction |
UpdatePortfolioDataAction |
UpdateAnalyticsDataAction;

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
  [propName: string]: number | Date;
}

interface PortfolioParam {
  range?: string;
}

interface PortfolioFilter {
  time: string;
  data: string;
}

interface AnalyticsData {
  total?: TotalAnalytics;
  annual?: AnnualizeAnalytics;
  pastYear?: PastYearAnalytics;
  [key: string]: TotalAnalytics | AnnualizeAnalytics | PastYearAnalytics;
}

interface TotalAnalytics {
  balance: number;
  cashFlow: number;
  returns: number;
  [key: string]: number;
}

interface AnnualizeAnalytics {
  returns: number;
  rateOfReturn: number;
  cashFlow: number;
  [key: string]: number;
}

interface PastYearAnalytics {
  returns: number;
  rateOfReturn: number;
  cashFlow: number;
  [key: string]: number;
}
