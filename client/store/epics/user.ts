import { Epic, combineEpics } from 'redux-observable';
import { createEpic } from 'utils/action-util';
import * as UserAction from 'store/actions/user';
import * as UserService from 'store/services/user';

const requestUserDataEpic = createEpic(
  UserAction.REQUEST_USER_DATA,
  UserService.requestUserData,
);

export const userEpic: Epic = combineEpics(requestUserDataEpic);
