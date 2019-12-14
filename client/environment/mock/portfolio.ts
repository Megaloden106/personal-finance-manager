import portolfioList from './data/portfolio/list';
import summaryPortfolio from './data/portfolio/summary';
import wdEsppPortfolio from './data/portfolio/wdESPP';
import wd401kPortfolio from './data/portfolio/wd401K';
import rothIRAPortfolio from './data/portfolio/rothIRA';
import healthEquityPortfolio from './data/portfolio/healthEquity';

const api = '/api/portfolio';

export const summaryTotalAnalyticsResponse: TotalAnalytics = {
  balance: 185640.07,
  cashFlow: 135772.32,
  returns: 49867.75,
};

export const summaryAnnaulizeAnalyticsResponse: AnnualizeAnalytics = {
  returns: 7815.74,
  rateOfReturn: 9.87,
  cashFlow: 21115.18,
};

export const summaryPastYearAnalyticsResponse: PastYearAnalytics = {
  returns: 20813.73,
  rateOfReturn: 12.36,
  cashFlow: 13490.84,
};

export const PortfolioSenarios: Scenario[] = [
  {
    scenarios: {
      GET: {
        delay: Math.floor(Math.random() * 150) + 100,
        description: 'Portfolio List Sucesss',
        response: {
          body: portolfioList,
          status: 200,
        },
      },
    },
    url: `${api}`,
  }, {
    scenarios: {
      GET: {
        delay: Math.floor(Math.random() * 150) + 100,
        description: 'Summary Portfolio Sucesss',
        response: {
          body: summaryPortfolio.slice(-6),
          status: 200,
        },
      },
    },
    url: `${api}/1?range=180D`,
  }, {
    scenarios: {
      GET: {
        delay: Math.floor(Math.random() * 150) + 100,
        description: 'WD ESPP Portfolio Sucesss',
        response: {
          body: wdEsppPortfolio.slice(-6),
          status: 200,
        },
      },
    },
    url: `${api}/2?range=180D`,
  }, {
    scenarios: {
      GET: {
        delay: Math.floor(Math.random() * 150) + 100,
        description: 'WD 401K Portfolio Sucesss',
        response: {
          body: wd401kPortfolio.slice(-6),
          status: 200,
        },
      },
    },
    url: `${api}/3?range=180D`,
  }, {
    scenarios: {
      GET: {
        delay: Math.floor(Math.random() * 150) + 100,
        description: 'Roth IRA Portfolio Sucesss',
        response: {
          body: rothIRAPortfolio.slice(-6),
          status: 200,
        },
      },
    },
    url: `${api}/4?range=180D`,
  }, {
    scenarios: {
      GET: {
        delay: Math.floor(Math.random() * 150) + 100,
        description: 'Health Equity Portfolio Sucesss',
        response: {
          body: healthEquityPortfolio.slice(-6),
          status: 200,
        },
      },
    },
    url: `${api}/5?range=180D`,
  }, {
    scenarios: {
      GET: {
        delay: Math.floor(Math.random() * 150) + 100,
        description: 'Summary Total Card Sucesss',
        response: {
          body: {
            total: summaryTotalAnalyticsResponse,
            annual: summaryAnnaulizeAnalyticsResponse,
            pastYear: summaryPastYearAnalyticsResponse,
          },
          status: 200,
        },
      },
    },
    url: `${api}/analytics/1`,
  },
];
