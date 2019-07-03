import {
  createStore,
  applyMiddleware,
  Store,
  compose,
} from 'redux';
import { createEpicMiddleware, EpicMiddleware } from 'redux-observable';
import { AppState, rootEpic, rootReducer } from '@/reducers';
import { userInitialState, UserAction } from '@/reducers/user';
import { dropdownInitState, DropdownAction } from '@/reducers/dropdown';

type AllAction = UserAction | DropdownAction;

const epicMiddleware: EpicMiddleware<AllAction> = createEpicMiddleware();

const initialState: AppState = {
  user: userInitialState,
  dropdown: dropdownInitState,
};

// createStore: Reducer<State>, Action, StoreExt: any, StateExt: any
const store: Store<AppState> = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(epicMiddleware),
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ // eslint-disable-line
      && (window as any).__REDUX_DEVTOOLS_EXTENSION__(), // eslint-disable-line
  ),
);

epicMiddleware.run(rootEpic);

export default store;
