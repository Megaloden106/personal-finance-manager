import { Reducer } from 'redux';
import { AnalyticsState } from 'store/models/analytics';
import { FluxAction } from 'store/models/action';
import * as AnalyticsAction from 'store/actions/analytics';

export const initialAnalyticsState: AnalyticsState = {
  total: {
    balance: 0,
    cashFlow: 0,
    returns: 0,
  },
  annualize: {
    returns: 0,
    rateOfReturn: 0,
    cashFlow: 0,
  },
  pastYear: {
    returns: 0,
    rateOfReturn: 0,
    cashFlow: 0,
  },
};

export const analyticsReducer: Reducer<AnalyticsState, FluxAction<any>> = (
  state = initialAnalyticsState,
  action,
) => {
  switch (action.type) {
    case AnalyticsAction.REQUEST_ANALYTICS_TOTAL_SUCCESS:
      return {
        ...state,
        total: action.payload,
      };
    case AnalyticsAction.REQUEST_ANALYTICS_ANNUALIZE_SUCCESS:
      return {
        ...state,
        annualize: action.payload,
      };
    case AnalyticsAction.REQUEST_ANALYTICS_PAST_YEAR_SUCCESS:
      return {
        ...state,
        pastYear: action.payload,
      };
    default:
      return state;
  }
};
