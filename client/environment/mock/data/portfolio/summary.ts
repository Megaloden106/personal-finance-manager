import { PortfolioData } from 'store/models/portfolio';

const summary: PortfolioData[] = [
  {
    date: new Date('12/31/2018'),
    balance: 134018.48,
    transfers: -3665.8,
    returns: -7522.98 + 6128.24,
    cumulativeReturns: 15686.02,
  }, {
    date: new Date('1/31/2019'),
    balance: 146936.46,
    transfers: 200,
    returns: 7302.60 + 5415.38,
    cumulativeReturns: 28404,
  }, {
    date: new Date('2/28/2019'),
    balance: 153900.11,
    transfers: 200,
    returns: 2262.81 + 2696.79,
    cumulativeReturns: 33363.60,
  }, {
    date: new Date('3/29/2019'),
    balance: 159131.80,
    transfers: 204.50,
    returns: 2077.44 + 1149.30,
    cumulativeReturns: 36590.34,
  }, {
    date: new Date('4/30/2019'),
    balance: 168763.34,
    transfers: 204.50,
    returns: 4417.06 + 2899.96,
    cumulativeReturns: 43907.36,
  }, {
    date: new Date('5/31/2019'),
    balance: 160642.88,
    transfers: 204.50,
    returns: -5971.79 - 5454.99,
    cumulativeReturns: 33480.58,
  }, {
    date: new Date('6/28/2019'),
    balance: 170769.05,
    transfers: 204.50,
    returns: 4986.05 + 3927.93,
    cumulativeReturns: 42339.56,
  },
];

export default summary;
