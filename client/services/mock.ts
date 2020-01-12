import { AxiosRequestConfig, AxiosPromise, AxiosError } from 'axios';

export default class BaseMockService {
  private scenarios: Scenario[];

  public getMockError = (_config: AxiosRequestConfig): Promise<AxiosError> => {
    const mockError = new Error() as AxiosError;
    mockError.config = _config;
    return Promise.reject(mockError);
  }

  public constructor(scenarios: Scenario[]) {
    this.scenarios = scenarios;
  }

  public isUrlMocked(_config: AxiosRequestConfig): boolean {
    const { method } = _config;
    if (!method) return false;

    const matchedRoutes = this.scenarios
      .filter(_s => _s.url === BaseMockService.getQueryUrl(_config));
    for (let i = 0; i < matchedRoutes.length; i += 1) {
      const { scenarios: _s } = matchedRoutes[i];
      const upperCaseMethod = method.toUpperCase() as Method;
      if (_s[upperCaseMethod]) return true;
    }

    return false;
  }

  public getScenario({ config }: AxiosError): AxiosPromise {
    const { method } = config;
    let scenario: ScenarioResponse | undefined;

    const matchedRoutes = this.scenarios
      .filter(_s => _s.url === BaseMockService.getQueryUrl(config));
    for (let i = 0; i < matchedRoutes.length && !scenario; i += 1) {
      const { scenarios: _s } = matchedRoutes[i];
      const upperCaseMethod = (method && method.toUpperCase()) as Method;
      scenario = _s[upperCaseMethod];
    }
    if (!scenario) return null;

    const {
      delay,
      response: { body, status },
    } = scenario;

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: body,
          status,
          statusText: 'OK',
          headers: {},
          config,
          request: {},
        });
      }, delay);
    });
  }

  private static getQueryUrl({ url, params }: AxiosRequestConfig) {
    let queryUrl = url;
    if (params) {
      queryUrl += '?';
      Object.keys(params).forEach((k) => {
        queryUrl += `${k}=${params[k]}`;
      });
    }
    return queryUrl;
  }
}
