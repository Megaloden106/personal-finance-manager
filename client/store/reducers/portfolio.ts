import { Reducer } from 'redux';
import { PortfolioState } from '@/store/models/portfolio';
import { FluxAction } from '@/store/models/action';
import * as PortfolioAction from '@/store/actions/portfolio';

export const initialPortfolioState: PortfolioState = {
  list: [],
  selected: {
    name: null,
    id: null,
    data: [],
  },
};

export const portfolioReducer: Reducer<PortfolioState, FluxAction<any>> = (
  state = initialPortfolioState,
  action,
) => {
  switch (action.type) {
    case PortfolioAction.REQUEST_PORTFOLIO_LIST_SUCCESS:
      return {
        list: action.payload,
        selected: state.selected.name
          ? state.selected
          : {
            name: action.payload[0].name,
            id: action.payload[0].id,
            data: [],
          },
      };
    case PortfolioAction.REQUEST_SELECTED_PORTFOLIO:
      return {
        ...state,
        selected: {
          name: action.payload.name,
          id: action.payload.id,
          data: [],
        },
      };
    case PortfolioAction.REQUEST_SELECTED_PORTFOLIO_SUCCESS:
      return {
        ...state,
        selected: {
          ...state.selected,
          data: action.payload,
        },
      };
    default:
      return state;
  }
};
