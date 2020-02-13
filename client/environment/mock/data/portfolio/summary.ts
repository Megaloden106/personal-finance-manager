import { PortfolioData } from 'store/models/portfolio';

const summary: PortfolioData[] = [
  {
    date: new Date('12/31/2018'),
    balance: 1340182.48,
    transfers: -3665.8,
    returns: -7522.98 + 61285.24,
    cumulativeReturns: 156863.02,
  }, {
    date: new Date('1/31/2019'),
    balance: 1469364.46,
    transfers: 200,
    returns: 7302.60 + 54154.38,
    cumulativeReturns: 284044,
  }, {
    date: new Date('2/28/2019'),
    balance: 1539006.11,
    transfers: 200,
    returns: 2262.81 + 26964.79,
    cumulativeReturns: 333634.60,
  }, {
    date: new Date('3/29/2019'),
    balance: 1591317.80,
    transfers: 2004.50,
    returns: 2077.44 + 11495.30,
    cumulativeReturns: 365905.34,
  }, {
    date: new Date('4/30/2019'),
    balance: 1687639.34,
    transfers: 2004.50,
    returns: 4417.06 + 28996.96,
    cumulativeReturns: 439072.36,
  }, {
    date: new Date('5/31/2019'),
    balance: 1606420.88,
    transfers: 2004.50,
    returns: -5971.79 - 54547.99,
    cumulativeReturns: 334801.58,
  }, {
    date: new Date('6/28/2019'),
    balance: 1707691.05,
    transfers: 2004.50,
    returns: 4986.05 + 39277.93,
    cumulativeReturns: 423394.56,
  },
];

export default summary;
