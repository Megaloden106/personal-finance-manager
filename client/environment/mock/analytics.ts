import { TotalAnalytic, AnnualizeAnalytic, PastYearAnalytic } from 'store/models/analytics';

const api = '/api/analytics';

export const summaryTotalAnalyticsResponse: TotalAnalytic = {
  balance: 185640.07,
  cashFlow: 135772.32,
  returns: 49867.75,
};

export const summaryAnnaulizeAnalyticsResponse: AnnualizeAnalytic = {
  returns: 7815.74,
  rateOfReturn: 9.87,
  cashFlow: 21115.18,
};

export const summaryPastYearAnalyticsResponse: PastYearAnalytic = {
  returns: 20813.73,
  rateOfReturn: 12.36,
  cashFlow: 13490.84,
};

export const AnalyticsScenarios: Scenario[] = [
  {
    scenarios: {
      GET: {
        delay: Math.floor(Math.random() * 150) + 100,
        description: 'Summary Total Card Sucesss',
        response: {
          body: summaryTotalAnalyticsResponse,
          status: 200,
        },
      },
    },
    url: `${api}/total/1`,
  }, {
    scenarios: {
      GET: {
        delay: Math.floor(Math.random() * 150) + 100,
        description: 'Summary Annualize Card Sucesss',
        response: {
          body: summaryAnnaulizeAnalyticsResponse,
          status: 200,
        },
      },
    },
    url: `${api}/annualize/1`,
  }, {
    scenarios: {
      GET: {
        delay: Math.floor(Math.random() * 150) + 100,
        description: 'Summary Past Year Card Sucesss',
        response: {
          body: summaryPastYearAnalyticsResponse,
          status: 200,
        },
      },
    },
    url: `${api}/past-year/1`,
  },
];
