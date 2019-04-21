import { createStore, applyMiddleware, Store } from 'redux';
import thunk from 'redux-thunk';
import { AppState, rootReducer } from '@/reducers';

// createStore: State, Action, StoreExt: any, StateExt: any
const store: Store<AppState> = createStore(
  rootReducer,
  applyMiddleware(thunk),
);

export default store;
