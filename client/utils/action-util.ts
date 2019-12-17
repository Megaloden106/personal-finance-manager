import { Epic, ofType } from 'redux-observable';
import { from } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { ActionCreator, EpicCreator } from '@/store/models/action';

/**
 * Action generator function
 * @param type action type
 * @param payload option action data
 * @param error optional error boolean
 * @param meta opitional metadata
 */
export const createAction: ActionCreator = (type, payload, error, meta) => ({
  type,
  payload,
  error,
  meta,
});

/**
 * Epic generator function
 * @param actionType for pipe filter and map
 * @param service axios request
 */
export const createEpic: EpicCreator = (actionType, service): Epic => action$ => action$.pipe(
  ofType(actionType),
  switchMap(action => from(service(action))),
  map((res) => {
    const isError = 'isAxiosError' in res;
    const action = isError ? `${actionType} Error` : `${actionType} Success`;
    const payload = 'isAxiosError' in res ? res.response : res.data;

    return createAction(action, payload, isError);
  }),
);
