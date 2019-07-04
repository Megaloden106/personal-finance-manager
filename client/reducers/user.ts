import { Reducer } from 'redux';
import { ofType, Epic } from 'redux-observable';
import { map, switchMap } from 'rxjs/operators';
import ajax from '@/services/ajax';
// import { ajax } from 'rxjs/ajax';

enum UserActionType {
  FETCH_USER_DATA = '[User] Fetch Data',
  UPDATE_USER_DATA = '[User] Updates Data',
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
  switchMap(() => ajax.getJSON('/api/user/')),
  map(response => updateUserData(response)),
);

const userReducer: Reducer<UserState, UserAction> = (
  state = userInitialState,
  action,
) => {
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
