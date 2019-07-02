import {
  createStore,
  applyMiddleware,
  Store,
  compose,
} from 'redux';
import { createEpicMiddleware, EpicMiddleware } from 'redux-observable';
import { AppState, rootEpic, rootReducer } from '@/reducers';
import { userInitialState } from '@/reducers/user';
import { dropdownInitState } from '@/reducers/dropdown';

const epicMiddleware: EpicMiddleware<any> = createEpicMiddleware();

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
