import { Reducer } from 'redux';
import { SidepanelState } from '@/store/models/sidepanel';
import { FluxAction } from '@/store/models/action';
import * as SidepanelAction from '@/store/actions/sidepanel';

export const initialSidepanelState: SidepanelState = {
  isOpen: false,
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
    default:
      return state;
  }
};
