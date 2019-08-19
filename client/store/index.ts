import {
  createStore,
  applyMiddleware,
  Store,
  compose,
} from 'redux';
import { createEpicMiddleware, EpicMiddleware } from 'redux-observable';
import { rootEpic, rootReducer } from '@/reducers';
import { initialUserState } from '@/reducers/user';
import { initialPortfolioState } from '@/reducers/portfolio';

const epicMiddleware: EpicMiddleware<AppAction> = createEpicMiddleware();

const initialState: AppState = {
  user: initialUserState,
  portfolio: initialPortfolioState,
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
