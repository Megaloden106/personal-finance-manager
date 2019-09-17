declare enum UserActionType {
  FETCH_USER_DATA = '[User] Fetch Data',
  INIT_USER_DATA = '[User] Initialize Data',
}

interface UserState {
  username: string | null;
  accessLevel: number;
}

interface FetchUserAction {
  type: UserActionType.FETCH_USER_DATA;
}

interface UpdateUserAction {
  type: UserActionType.INIT_USER_DATA;
  payload: UserState;
}

type UserAction = FetchUserAction | UpdateUserAction;
