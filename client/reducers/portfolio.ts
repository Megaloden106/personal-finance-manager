import { Reducer } from 'redux';
import { ofType, Epic, combineEpics } from 'redux-observable';
import { map, switchMap } from 'rxjs/operators';
import { from } from 'rxjs';
import axios from '@/services/axios';

enum PortfolioActionType {
  FETCH_PORTFOLIO = '[Portfolio] Fetch Portfolio',
  FETCH_PORTFOLIO_DATA = '[Portfolio] Fetch Data',
  INIT_PORTFOLIO_DATA = '[Portfolio] Initialize Data',
  UPDATE_PORTFOLIO_DATA = '[Portfolio] Update Data',
}

export const initialPortfolioState: PortfolioState = {
  name: null,
  id: null,
  list: [],
  data: [],
};

export const initializePortfolioList = (portfolio: PortfolioList): InitPortfolioAction => ({
  type: PortfolioActionType.INIT_PORTFOLIO_DATA,
  portfolio,
});

export const updatePortfolioData = (data: PortfolioData): UpdateDataAction => ({
  type: PortfolioActionType.UPDATE_PORTFOLIO_DATA,
  data,
});

export const fetchPortfolio = (): FetchPortfolioAction => (
  { type: PortfolioActionType.FETCH_PORTFOLIO }
);

export const fetchPortfolioData = (id: number| string): FetchPortfolioEntryAction => ({
  type: PortfolioActionType.FETCH_PORTFOLIO_DATA,
  id,
});

const portfolioStateEpic: Epic = action$ => action$.pipe(
  ofType(PortfolioActionType.FETCH_PORTFOLIO),
  switchMap(() => from(axios.get('/api/portfolio/'))),
  map(_res => _res.data),
  map(initializePortfolioList),
);

const PortfolioEntryEpic: Epic = action$ => action$.pipe(
  ofType(PortfolioActionType.FETCH_PORTFOLIO_DATA),
  switchMap(({ id }: FetchPortfolioEntryAction) => from(axios.get(`/api/portfolio/${id}`))),
  map(_res => _res.data),
  map(updatePortfolioData),
);

export const portfolioEpic = combineEpics(
  portfolioStateEpic,
  PortfolioEntryEpic,
);

const portfolioReducer: Reducer<PortfolioState, PortfolioAction> = (
  state = initialPortfolioState,
  action,
) => {
  switch (action.type) {
    case PortfolioActionType.INIT_PORTFOLIO_DATA:
      return {
        ...state,
        name: action.portfolio.list[0].name,
        id: action.portfolio.list[0].id,
        ...action.portfolio,
      };
    case PortfolioActionType.UPDATE_PORTFOLIO_DATA:
      return {
        ...state,
        name: action.data.name,
        id: action.data.id,
        data: action.data.entries,
      };
    default:
      return state;
  }
};

export default portfolioReducer;
