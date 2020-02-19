import { createAction } from 'utils/action-util';
import { SidepanelTab } from '../models/sidepanel';

export const UPDATE_SIDEPANEL_STATUS = '[Sidepanel] Update Open Status';

export const updateSidepanelStatusAction = (isOpen: boolean) => createAction(
  UPDATE_SIDEPANEL_STATUS,
  isOpen,
);

export const UPDATE_SIDEPANEL_TAB = '[Sidepanel] Update Open Tab';

export const updateSidepanelTabAction = (selectedTab: SidepanelTab) => createAction(
  UPDATE_SIDEPANEL_TAB,
  selectedTab,
);
