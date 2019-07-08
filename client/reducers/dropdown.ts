import { Reducer } from 'redux';

enum DropdownActionType {
  SET_DROPDOWN_ITEMS = '[Dropdown] Set Items',
  SET_DROPDOWN_SELECT = '[Dropdown] Set Selected Data',
}

export const initialDropdownState: DropdownState = {
  menu: null,
  selected: {
    data: 'Returns',
    time: 'Total',
  },
};

export const setDropdownItems = (payload: Item[] | null): MenuItemsAction => ({
  type: DropdownActionType.SET_DROPDOWN_ITEMS,
  payload,
});

export const setItemSelection = (payload: Item): SetItemAction => ({
  type: DropdownActionType.SET_DROPDOWN_SELECT,
  payload,
});

const dropdownReducer: Reducer<DropdownState, DropdownAction> = (
  state = initialDropdownState,
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
