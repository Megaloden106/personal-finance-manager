import { Reducer } from 'redux';
import { ofType, Epic, combineEpics } from 'redux-observable';
import { map, switchMap } from 'rxjs/operators';
import { from } from 'rxjs';
import axios from '@/services/axios';

enum PortfolioActionType {
  FETCH_PORTFOLIO_LIST = '[Portfolio] Fetch Portfolio List',
  INIT_PORTFOLIO_LIST = '[Portfolio] Initialize Portfolio List',
  FETCH_PORTFOLIO_DATA = '[Portfolio] Fetch Data',
  UPDATE_PORTFOLIO_DATA = '[Portfolio] Update Data',
}

export const initialPortfolioState: PortfolioState = {
  name: null,
  id: null,
  list: [],
  data: [],
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
  switchMap(() => from(axios.get('/api/portfolio/'))),
  map(_res => _res.data),
  map(initializePortfolioList),
);

export const fetchPortfolioData = (
  id: string| number,
  params: PortfolioParam,
): FetchPortfolioDataAction => ({
  type: PortfolioActionType.FETCH_PORTFOLIO_DATA,
  id,
  params,
});

export const updatePortfolioData = (data: PortfolioData[]): UpdateDataAction => ({
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

export const portfolioEpic = combineEpics(
  portfolioListEpic,
  portfolioDataEpic,
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
    case PortfolioActionType.FETCH_PORTFOLIO_DATA: {
      const portfolios = state.list.filter(({ id }) => id === action.id);
      return {
        ...state,
        name: portfolios[0].name,
        id: portfolios[0].id,
      };
    }
    case PortfolioActionType.UPDATE_PORTFOLIO_DATA:
      return {
        ...state,
        data: action.data,
      };
    default:
      return state;
  }
};

export default portfolioReducer;
