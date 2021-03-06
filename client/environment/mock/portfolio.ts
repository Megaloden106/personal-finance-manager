import portolfioList from './data/portfolio/list';
import summaryPortfolio from './data/portfolio/summary';
import wdEsppPortfolio from './data/portfolio/wdESPP';
import wd401kPortfolio from './data/portfolio/wd401K';
import rothIRAPortfolio from './data/portfolio/rothIRA';
import healthEquityPortfolio from './data/portfolio/healthEquity';

const api = '/api/portfolio';

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
  },
];
