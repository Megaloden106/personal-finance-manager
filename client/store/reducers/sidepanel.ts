import { Reducer } from 'redux';
import {
  SidepanelState,
  SidepanelTab,
  PortfolioDataForm,
  IPortfolioForm,
} from 'store/models/sidepanel';
import { FluxAction } from 'store/models/action';
import * as SidepanelAction from 'store/actions/sidepanel';

const defaultDataPoint: PortfolioDataForm = {
  date: null,
  portfolio: null,
};

const defaultPortfolio: IPortfolioForm = {
  name: null,
  brokerage: null,
  isRetirement: false,
  isSavings: false,
};

export const initialSidepanelState: SidepanelState = {
  isOpen: false,
  selectedTab: SidepanelTab.Portfolio,
  dataPoint: defaultDataPoint,
  portfolio: defaultPortfolio,
};

export const sidepanelReducer: Reducer<SidepanelState, FluxAction<any>> = (
  state = initialSidepanelState,
  action,
) => {
  switch (action.type) {
    case SidepanelAction.UPDATE_SIDEPANEL_STATUS:
      return {
        ...state,
        isOpen: action.payload,
      };
    case SidepanelAction.UPDATE_SIDEPANEL_TAB:
      return {
        ...state,
        selectedTab: action.payload,
      };
    default:
      return state;
  }
};
