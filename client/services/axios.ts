import axios, { AxiosRequestConfig, AxiosPromise, AxiosError } from 'axios';
import { scenarios } from '../environment/mock';
import BaseMockService from './mock';

const MockService = new BaseMockService(scenarios);

const mockAdapter = (_config: AxiosRequestConfig): any => {
  if (process.env.mock && MockService.isUrlMocked(_config)) {
    const { method, url } = _config;
    // eslint-disable-next-line no-console
    console.log(`DEBUG: mocking response from ${method}: ${url}`);
    return MockService.getMockError(_config);
  }

  return _config;
};

const mockResponse = (_error: AxiosError): AxiosPromise | Promise<AxiosError> => {
  if (process.env.mock && MockService.isUrlMocked(_error.config)) {
    return MockService.getScenario(_error);
  }

  return Promise.resolve(_error);
};

axios.interceptors.request.use(mockAdapter);

axios.interceptors.response.use(_r => _r, mockResponse);

export default axios;
