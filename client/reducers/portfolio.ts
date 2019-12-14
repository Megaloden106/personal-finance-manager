import { Reducer } from 'redux';
import { ofType, Epic, combineEpics } from 'redux-observable';
import { map, switchMap } from 'rxjs/operators';
import { from } from 'rxjs';
import axios from '@/services/axios';

enum PortfolioActionType {
  FETCH_PORTFOLIO_LIST = '[Portfolio] Fetch Portfolio List',
  INIT_PORTFOLIO_LIST = '[Portfolio] Initialize Portfolio List',
  SET_PORTFOLIO = '[Portfolio] Set Portfolio',
  FETCH_PORTFOLIO_DATA = '[Portfolio] Fetch Portfolio Data',
  UPDATE_PORTFOLIO_DATA = '[Portfolio] Update Portfolio Data',
  FETCH_ANALYTICS_DATA = '[Portfolio] Fetch Analytics',
  UPDATE_ANALYTICS_DATA = '[Portfolio] Update Analytics',
}

export const initialPortfolioState: PortfolioState = {
  name: null,
  id: null,
  list: [],
  data: [],
  analytics: {},
};

export const fetchPortfolioList = (): FetchPortfolioAction => (
  { type: PortfolioActionType.FETCH_PORTFOLIO_LIST }
);

export const initializePortfolioList = (portfolios: Portfolio[]): InitPortfolioListAction => ({
  type: PortfolioActionType.INIT_PORTFOLIO_LIST,
  portfolios,
});

const portfolioListEpic: Epic = action$ => action$.pipe(
  ofType(PortfolioActionType.FETCH_PORTFOLIO_LIST),
  switchMap(() => from(axios.get('/api/portfolio'))),
  map(_res => _res.data),
  map(initializePortfolioList),
);

export const setPortfolio = (portfolio: Portfolio): SetPortfolioAction => ({
  type: PortfolioActionType.SET_PORTFOLIO,
  portfolio,
});

export const fetchPortfolioData = (
  id: string,
  params: PortfolioParam,
): FetchPortfolioDataAction => ({
  type: PortfolioActionType.FETCH_PORTFOLIO_DATA,
  id,
  params,
});

export const updatePortfolioData = (data: PortfolioData[]): UpdatePortfolioDataAction => ({
  type: PortfolioActionType.UPDATE_PORTFOLIO_DATA,
  data,
});

const portfolioDataEpic: Epic = action$ => action$.pipe(
  ofType(PortfolioActionType.FETCH_PORTFOLIO_DATA),
  switchMap(({ id, params }: FetchPortfolioDataAction) => from(
    axios.get(`/api/portfolio/${id}`, { params }),
  )),
  map(_res => _res.data),
  map(updatePortfolioData),
);

export const fetchAnalyticsData = (id: string): FetchAnalyticsDataAction => ({
  type: PortfolioActionType.FETCH_ANALYTICS_DATA,
  id,
});

export const updateAnalyticsData = (data: AnalyticsData): UpdateAnalyticsDataAction => ({
  type: PortfolioActionType.UPDATE_ANALYTICS_DATA,
  data,
});

const portfolioAnalyticsEpic: Epic = action$ => action$.pipe(
  ofType(PortfolioActionType.FETCH_ANALYTICS_DATA),
  switchMap(({ id }: FetchAnalyticsDataAction) => from(
    axios.get(`/api/portfolio/analytics/${id}`),
  )),
  map(_res => _res.data),
  map(updateAnalyticsData),
);

export const portfolioEpic = combineEpics(
  portfolioListEpic,
  portfolioDataEpic,
  portfolioAnalyticsEpic,
);

const portfolioReducer: Reducer<PortfolioState, PortfolioAction> = (
  state = initialPortfolioState,
  action,
) => {
  switch (action.type) {
    case PortfolioActionType.INIT_PORTFOLIO_LIST:
      return {
        ...state,
        name: action.portfolios[0].name,
        id: action.portfolios[0].id,
        list: action.portfolios,
      };
    case PortfolioActionType.SET_PORTFOLIO:
      return {
        ...state,
        name: action.portfolio.name,
        id: action.portfolio.id,
      };
    case PortfolioActionType.UPDATE_PORTFOLIO_DATA:
      return {
        ...state,
        data: action.data,
      };
    case PortfolioActionType.UPDATE_ANALYTICS_DATA:
      return {
        ...state,
        analytics: action.data,
      };
    default:
      return state;
  }
};

export default portfolioReducer;
