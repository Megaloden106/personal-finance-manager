declare enum PortfolioActionType {
  FETCH_PORTFOLIO_LIST = '[Portfolio] Fetch Portfolio List',
  INIT_PORTFOLIO_LIST = '[Portfolio] Initialize Portfolio List',
  FETCH_PORTFOLIO_DATA = '[Portfolio] Fetch Data',
  UPDATE_PORTFOLIO_DATA = '[Portfolio] Update Data',
}

interface PortfolioState {
  name: string | null;
  id: string | number | null;
  list: Portfolio[];
  data: PortfolioData[];
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

interface UpdateDataAction {
  type: PortfolioActionType.UPDATE_PORTFOLIO_DATA;
  data: PortfolioData[];
}

type PortfolioAction = FetchPortfolioAction |
InitPortfolioListAction |
FetchPortfolioDataAction |
UpdateDataAction;

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
