import { Reducer } from 'redux';
import { ofType, Epic, combineEpics } from 'redux-observable';
import { map, switchMap } from 'rxjs/operators';
import ajax from '@/services/ajax';

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

export const initializePortfolioEntry = (payload: PortfolioList): InitPortfolioAction => ({
  type: PortfolioActionType.INIT_PORTFOLIO_DATA,
  payload,
});

export const updatePortfolioEntry = (payload: PortfolioData): UpdateDataAction => ({
  type: PortfolioActionType.UPDATE_PORTFOLIO_DATA,
  payload,
});

export const fetchPortfolio = (): FetchPortfolioAction => (
  { type: PortfolioActionType.FETCH_PORTFOLIO }
);

export const fetchPortfolioEntry = (payload: number| string): FetchPortfolioEntryAction => ({
  type: PortfolioActionType.FETCH_PORTFOLIO_DATA,
  payload,
});

const portfolioStateEpic: Epic = action$ => action$.pipe(
  ofType(PortfolioActionType.FETCH_PORTFOLIO),
  switchMap(() => ajax.getJSON('/api/portfolio/')),
  map(initializePortfolioEntry),
);

const PortfolioEntryEpic: Epic = action$ => action$.pipe(
  ofType(PortfolioActionType.FETCH_PORTFOLIO_DATA),
  switchMap((action: FetchPortfolioEntryAction) => ajax.getJSON(`/api/portfolio/${action.payload}`)),
  map(updatePortfolioEntry),
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
        name: action.payload.list[0].name,
        id: action.payload.list[0].id,
        ...action.payload,
      };
    case PortfolioActionType.UPDATE_PORTFOLIO_DATA:
      return {
        ...state,
        name: action.payload.name,
        id: action.payload.id,
        data: action.payload.data,
      };
    default:
      return state;
  }
};

export default portfolioReducer;
