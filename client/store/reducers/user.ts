import { Reducer } from 'redux';
import { UserState } from '@/store/models/user';
import { FluxAction } from '@/store/models/action';
import * as UserAction from '@/store/actions/user';

export const initialUserState: UserState = {
  username: null,
  accessLevel: 0,
};

export const userReducer: Reducer<UserState, FluxAction<any>> = (
  state = initialUserState,
  action,
) => {
  switch (action.type) {
    case UserAction.REQUEST_USER_DATA_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
