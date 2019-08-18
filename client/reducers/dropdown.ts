import { Reducer } from 'redux';

enum DropdownActionType {
  SET_DROPDOWN_ITEMS = '[Dropdown] Set Items',
}

export const initialDropdownState: DropdownState = {
  menu: null,
};

export const setDropdownItems = (menu: Item[] | null): MenuItemsAction => ({
  type: DropdownActionType.SET_DROPDOWN_ITEMS,
  menu,
});

const dropdownReducer: Reducer<DropdownState, DropdownAction> = (
  state = initialDropdownState,
  action,
) => {
  switch (action.type) {
    case DropdownActionType.SET_DROPDOWN_ITEMS:
      return {
        ...state,
        menu: action.menu,
      };
    default:
      return state;
  }
};

export default dropdownReducer;
