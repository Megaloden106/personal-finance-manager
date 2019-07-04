import {
  createStore,
  applyMiddleware,
  Store,
  compose,
} from 'redux';
import { createEpicMiddleware, EpicMiddleware } from 'redux-observable';
import { rootEpic, rootReducer } from '@/reducers';
import { userInitialState } from '@/reducers/user';
import { dropdownInitState } from '@/reducers/dropdown';

const epicMiddleware: EpicMiddleware<AppAction> = createEpicMiddleware();

const initialState: AppState = {
  user: userInitialState,
  dropdown: dropdownInitState,
};

// createStore: Reducer<State>, Action, StoreExt: any, StateExt: any
const store: Store<AppState, AppAction> = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(epicMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ // eslint-disable-line
      && window.__REDUX_DEVTOOLS_EXTENSION__(), // eslint-disable-line
  ),
);

epicMiddleware.run(rootEpic);

export default store;
