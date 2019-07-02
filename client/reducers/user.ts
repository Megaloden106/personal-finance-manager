import { Reducer, Action } from 'redux';
import { ofType, Epic } from 'redux-observable';
import { mergeMap, map } from 'rxjs/operators';
import ajax from '@/services/ajax';
// import { ajax } from 'rxjs/ajax';

enum UserActionType {
  FETCH_USER_DATA = '[User] Fetch Data',
  UPDATE_USER_DATA = '[User] Updates Data',
}

export interface Portfolio {
  name: string;
  brokerage: string;
  balance: number;
  returns: number;
  isGroup: boolean;
  isRetirement: boolean;
  isSavings: boolean;
}

export interface UserState {
  username?: string | null;
  accessLevel?: number;
  portfolios?: Portfolio[];
}

interface UserAction extends Action {
  type: UserActionType;
  payload?: UserState;
}

export const userInitialState: UserState = {
  username: null,
  accessLevel: 0,
  portfolios: [],
};

export const updateUserData = (payload: UserState): UserAction => ({
  type: UserActionType.UPDATE_USER_DATA,
  payload,
});

export const fetchUserData = (): UserAction => ({ type: UserActionType.FETCH_USER_DATA });

export const userEpic: Epic = action$ => action$.pipe(
  ofType(UserActionType.FETCH_USER_DATA),
  mergeMap(() => ajax.getJSON('/api/user/').pipe(
    map(response => updateUserData(response)),
  )),
);

const userReducer: Reducer<UserState, UserAction> = (state = userInitialState, action) => {
  switch (action.type) {
    case UserActionType.UPDATE_USER_DATA:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
