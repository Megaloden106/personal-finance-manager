import {
  createStore,
  applyMiddleware,
  Store,
  compose,
} from 'redux';
import { createEpicMiddleware, EpicMiddleware } from 'redux-observable';
import { AppState, rootEpic, rootReducer } from '@/reducers';

const epicMiddleware: EpicMiddleware<any> = createEpicMiddleware();

const initialState: AppState = {
  user: { username: null },
};

// createStore: Reducer<State>, Action, StoreExt: any, StateExt: any
const store: Store<AppState> = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(epicMiddleware),
    // eslint-disable-next-line
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);

epicMiddleware.run(rootEpic);

export default store;
