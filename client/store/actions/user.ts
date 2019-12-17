import { createAction } from '@/utils/action-util';

export const REQUEST_USER_DATA = '[User] Request User Data';
export const REQUEST_USER_DATA_SUCCESS = '[User] Request User Data Success';
export const REQUEST_USER_DATA_ERROR = '[User] Request User Data Error';

export const requestUserData = () => createAction(REQUEST_USER_DATA);
