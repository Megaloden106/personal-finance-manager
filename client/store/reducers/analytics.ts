import { Reducer } from 'redux';
import { AnalyticsState } from 'store/models/analytics';
import { FluxAction } from 'store/models/action';
import * as AnalyticsAction from 'store/actions/analytics';

export const initialAnalyticsState: AnalyticsState = {
  deposits: 0,
  withdrawals: 0,
  gains: 0,
  returns: 0,
  marketGains: 0,
  dividendReturns: 0,
  annualizeReturns: 0,
};

export const analyticsReducer: Reducer<AnalyticsState, FluxAction<any>> = (
  state = initialAnalyticsState,
  action,
) => {
  switch (action.type) {
    case AnalyticsAction.REQUEST_ANALYTICS_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
