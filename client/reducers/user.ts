import { Reducer } from 'redux';
import { ofType, Epic } from 'redux-observable';
import { map, switchMap } from 'rxjs/operators';
import ajax from '@/services/ajax';

enum UserActionType {
  FETCH_USER_DATA = '[User] Fetch Data',
  INIT_USER_DATA = '[User] Initialize Data',
}

export const initialUserState: UserState = {
  username: null,
  accessLevel: 0,
};

export const updateUserData = (payload: UserState): UpdateUserAction => ({
  type: UserActionType.INIT_USER_DATA,
  payload,
});

export const fetchUserData = (): FetchUserAction => ({ type: UserActionType.FETCH_USER_DATA });

export const userEpic: Epic = action$ => action$.pipe(
  ofType(UserActionType.FETCH_USER_DATA),
  switchMap(() => ajax.getJSON('/api/user/')),
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
