import { Reducer } from 'redux';
import { ofType, Epic } from 'redux-observable';
import { map, switchMap, tap } from 'rxjs/operators';
import { from } from 'rxjs';
import axios from '@/services/axios';

enum UserActionType {
  FETCH_USER_DATA = '[User] Fetch Data',
  INIT_USER_DATA = '[User] Initialize Data',
}

export const initialUserState: UserState = {
  username: null,
  accessLevel: 0,
};

export const updateUserData = (user: UserState): UpdateUserAction => ({
  type: UserActionType.INIT_USER_DATA,
  payload: user,
});

export const fetchUserData = (): FetchUserAction => ({ type: UserActionType.FETCH_USER_DATA });

export const userEpic: Epic = action$ => action$.pipe(
  ofType(UserActionType.FETCH_USER_DATA),
  switchMap(() => from(axios.get('/api/user/'))),
  map(_res => _res.data),
  map(updateUserData),
);

const userReducer: Reducer<UserState, UserAction> = (
  state = initialUserState,
  action,
) => {
  switch (action.type) {
    case UserActionType.INIT_USER_DATA:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
