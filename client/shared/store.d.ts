interface AppState {
  user: UserState;
  portfolio: PortfolioState;
}

type AppAction = UserAction | PortfolioAction;

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

declare enum PortfolioActionType {
  FETCH_PORTFOLIO = '[Portfolio] Fetch Portfolio',
  FETCH_PORTFOLIO_DATA = '[Portfolio] Fetch Data',
  INIT_PORTFOLIO_DATA = '[Portfolio] Initialize Data',
  UPDATE_PORTFOLIO_DATA = '[Portfolio] Update Data',
}

type DropdownAction = MenuItemsAction;

interface PortfolioState {
  name: string | null;
  id: string | number | null;
  list: Portfolio[];
  data: PortfolioEntry[];
}

interface FetchPortfolioAction {
  type: PortfolioActionType.FETCH_PORTFOLIO;
}

interface FetchPortfolioEntryAction {
  type: PortfolioActionType.FETCH_PORTFOLIO_DATA;
  id: number | string;
}

interface InitPortfolioAction {
  type: PortfolioActionType.INIT_PORTFOLIO_DATA;
  portfolio: PortfolioList;
}

interface UpdateDataAction {
  type: PortfolioActionType.UPDATE_PORTFOLIO_DATA;
  data: PortfolioData;
}

type PortfolioAction = FetchPortfolioAction | InitPortfolioAction | UpdateDataAction
