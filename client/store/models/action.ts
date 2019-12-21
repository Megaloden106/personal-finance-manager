import { Action } from 'redux';
import { Epic } from 'redux-observable';
import { AxiosPromise, AxiosError } from 'axios';

export interface Metadata {
  [propName: string]: any;
}

export interface FluxAction<T> extends Action<string> {
  type: string;
  payload?: T;
  error?: boolean;
  meta?: Metadata;
}

export type ServiceCreator = (action: FluxAction<any>) => AxiosPromise;

export type ActionCreator = <T = undefined>(
  type: string,
  payload?: T,
  error?: boolean,
  meta?: Metadata,
) => FluxAction<T>;

export type EpicCreator = <T = undefined>(
  actionType: string,
  service: (action: FluxAction<T>) => AxiosPromise | Promise<AxiosError>,
) => Epic;
