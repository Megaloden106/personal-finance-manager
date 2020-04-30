import { AnalyticsState } from 'store/models/analytics';

const api = '/api/analytics';

export const analyticsResponse: AnalyticsState = {
  deposits: 2218.00,
  withdrawals: 3885.80,
  gains: 13935.56,
  returns: 9.48,
  marketGains: 12394.24,
  dividendReturns: 1540.23,
  annualizeReturns: 8.43,
};

export const AnalyticsScenarios: Scenario[] = [
  {
    scenarios: {
      GET: {
        delay: Math.floor(Math.random() * 150) + 100,
        description: 'Analytics Sucesss',
        response: {
          body: analyticsResponse,
          status: 200,
        },
      },
    },
    url: `${api}/1`,
  },
];
