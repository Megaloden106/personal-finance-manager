// Action Types Declarations
declare enum UserActionType {
  FETCH_USER_DATA = '[User] Fetch Data',
  UPDATE_USER_DATA = '[User] Updates Data',
}

declare enum DropdownActionType {
  SET_DROPDOWN_ITEMS = '[Dropdown] Set Items',
  SET_DROPDOWN_SELECT = '[Dropdown] Set Selected Data',
}

// State Declarations
interface AppState {
  user: UserState;
  dropdown: DropdownState;
}

interface DropdownState {
  menu: Item[] | null;
  selected: ItemSelection;
}

interface UserState {
  username: string | null;
  accessLevel: number;
  portfolios: Portfolio[];
}

// Action Declarations
interface UserAction {
  type: UserActionType;
  payload?: UserState;
}

interface MenuItemsAction {
  type: DropdownActionType.SET_DROPDOWN_ITEMS;
  payload: Item[] | null;
}

interface SetItemAction {
  type: DropdownActionType.SET_DROPDOWN_SELECT;
  payload: Item;
}

// Union Type Declarations
type AppAction = UserAction | DropdownAction;

type DropdownAction = MenuItemsAction | SetItemAction;
