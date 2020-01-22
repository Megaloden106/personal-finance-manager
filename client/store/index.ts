import {
  createStore,
  applyMiddleware,
  Store,
  compose,
} from 'redux';
import { createEpicMiddleware, EpicMiddleware } from 'redux-observable';
import { FluxAction } from './models/action';
import { AppState } from './models/store';
import { rootReducer } from './reducers';
import { rootEpic } from './epics';
import { initialUserState } from './reducers/user';
import { initialPortfolioState } from './reducers/portfolio';
import { initialAnalyticsState } from './reducers/analytics';
import { initialSidepanelState } from './reducers/sidepanel';

const epicMiddleware: EpicMiddleware<FluxAction<any>> = createEpicMiddleware();

const initialState: AppState = {
  user: initialUserState,
  portfolio: initialPortfolioState,
  analytics: initialAnalyticsState,
  sidepanel: initialSidepanelState,
};

// createStore: Reducer<State>, Action, StoreExt: any, StateExt: any
const store: Store<AppState, FluxAction<any>> = createStore(
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
