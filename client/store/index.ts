import { createStore, applyMiddleware, Store } from 'redux';
import { createEpicMiddleware, EpicMiddleware } from 'redux-observable';
import { AppState, rootEpic, rootReducer } from '@/reducers';

const epicMiddleware: EpicMiddleware<any> = createEpicMiddleware();

const initialState: AppState = {};

export default function configureStore() {
  // createStore: Reducer<State>, Action, StoreExt: any, StateExt: any
  const store: Store<AppState> = createStore(
    rootReducer,
    initialState,
    applyMiddleware(epicMiddleware),
  );

  epicMiddleware.run(rootEpic);

  return store;
}
