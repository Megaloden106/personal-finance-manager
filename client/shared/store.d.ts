interface AppState {
  user: UserState;
  dropdown: DropdownState;
  portfolio: PortfolioState;
}

type AppAction = UserAction | DropdownAction | PortfolioAction;

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


declare enum DropdownActionType {
  SET_DROPDOWN_ITEMS = '[Dropdown] Set Items',
  SET_DROPDOWN_SELECT = '[Dropdown] Set Selected Data',
}

interface DropdownState {
  menu: Item[] | null;
  selected: PortfolioFilter;
}

interface MenuItemsAction {
  type: DropdownActionType.SET_DROPDOWN_ITEMS;
  payload: Item[] | null;
}

interface SetItemAction {
  type: DropdownActionType.SET_DROPDOWN_SELECT;
  payload: Item;
}


declare enum PortfolioActionType {
  FETCH_PORTFOLIO = '[Portfolio] Fetch Portfolio',
  FETCH_PORTFOLIO_DATA = '[Portfolio] Fetch Data',
  INIT_PORTFOLIO_DATA = '[Portfolio] Initialize Data',
  UPDATE_PORTFOLIO_DATA = '[Portfolio] Update Data',
}

type DropdownAction = MenuItemsAction | SetItemAction;

interface PortfolioState {
  name: string | null;
  id: string | number | null;
  list: Portfolio[];
  data: PortfolioEntry[];
}

interface PortfolioList {
  list: Portfolio[];
  data: PortfolioEntry[];
}

interface PortfolioData {
  id: string | number;
  name: string;
  data: PortfolioEntry[];
}

interface FetchPortfolioAction {
  type: PortfolioActionType.FETCH_PORTFOLIO;
}

interface FetchPortfolioEntryAction {
  type: PortfolioActionType.FETCH_PORTFOLIO_DATA;
  payload: number | string;
}

interface InitPortfolioAction {
  type: PortfolioActionType.INIT_PORTFOLIO_DATA;
  payload: PortfolioList;
}

interface UpdateDataAction {
  type: PortfolioActionType.UPDATE_PORTFOLIO_DATA;
  payload: PortfolioData;
}

type PortfolioAction = FetchPortfolioAction | InitPortfolioAction | UpdateDataAction