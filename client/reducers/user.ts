import { Reducer, Action } from 'redux';
import { ofType, Epic } from 'redux-observable';
import { mergeMap, map } from 'rxjs/operators';
import ajax from '@/services/ajax';
// import { ajax } from 'rxjs/ajax';

enum UserActionType {
  FETCH_USER_DATA = 'FETCH_USER_DATA',
  UPDATE_USER_DATA = 'UPDATE_USER_DATA',
}

export interface UserState {
  username?: string | null;
  accessLevel?: number;
}

interface UserAction extends Action {
  type: UserActionType;
  payload?: UserState;
}

export const initialState: UserState = {
  username: null,
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

const userReducer: Reducer = (state: UserState = initialState, action: UserAction) => {
  console.log(action); // eslint-disable-line
  switch (action.type) {
    case UserActionType.UPDATE_USER_DATA:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default userReducer;
