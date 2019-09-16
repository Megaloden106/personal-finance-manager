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

  public isUrlMocked({ method, url }: AxiosRequestConfig): boolean {
    if (!method) return false;

    const matchedRoutes = this.scenarios.filter(_s => _s.url === url);
    for (let i = 0; i < matchedRoutes.length; i += 1) {
      const { scenarios: _s } = matchedRoutes[i];
      const upperCaseMethod = method.toUpperCase() as Method;
      if (_s[upperCaseMethod]) return true;
    }

    return false;
  }

  public getScenario({ config }: AxiosError): AxiosPromise | null {
    const { url, method } = config;
    let scenario: ScenarioResponse | undefined;

    const matchedRoutes = this.scenarios.filter(_s => _s.url === url);
    for (let i = 0; i < matchedRoutes.length && !scenario; i += 1) {
      const { scenarios: _s } = matchedRoutes[i];
      const upperCaseMethod = (method && method.toUpperCase()) as Method;
      scenario = _s[upperCaseMethod] as ScenarioResponse;
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
}
