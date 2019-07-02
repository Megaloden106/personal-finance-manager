import { Reducer, Action } from 'redux';
import { Item, ItemSelection } from '@/shared/dropdown';

enum DropdownActionType {
  SET_DROPDOWN_ITEMS = '[Dropdown] Set Items',
  SET_DROPDOWN_SELECT = '[Dropdown] Set Selected Data',
}

export interface DropdownState {
  menu: Item[] | null;
  selected: ItemSelection;
}

export const dropdownInitState: DropdownState = {
  menu: null,
  selected: {
    data: 'Returns',
    time: 'Total',
  },
};

interface MenuItemsAction extends Action {
  type: DropdownActionType.SET_DROPDOWN_ITEMS;
  payload: Item[] | null;
}

export const setDropdownItems = (payload: Item[] | null): MenuItemsAction => ({
  type: DropdownActionType.SET_DROPDOWN_ITEMS,
  payload,
});

interface SetItemAction extends Action {
  type: DropdownActionType.SET_DROPDOWN_SELECT;
  payload: Item;
}

export const setItemSelection = (payload: Item): SetItemAction => ({
  type: DropdownActionType.SET_DROPDOWN_SELECT,
  payload,
});

export type DropdownAction = MenuItemsAction | SetItemAction;

const dropdownReducer: Reducer<DropdownState, DropdownAction> = (
  state = dropdownInitState,
  action,
) => {
  switch (action.type) {
    case DropdownActionType.SET_DROPDOWN_ITEMS:
      return {
        ...state,
        menu: action.payload,
      };
    case DropdownActionType.SET_DROPDOWN_SELECT:
      return {
        ...state,
        selected: {
          ...state.selected,
          [action.payload.value]: action.payload.text,
        },
      };
    default:
      return state;
  }
};

export default dropdownReducer;
