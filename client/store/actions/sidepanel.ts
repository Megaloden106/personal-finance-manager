import { createAction } from '@/utils/action-util';

export const UPDATE_SIDEPANEL_STATUS = '[Sidepanel] Update Open Status';

export const updateSidepanelStatusAction = (isOpen: boolean) => createAction(
  UPDATE_SIDEPANEL_STATUS,
  isOpen,
);
