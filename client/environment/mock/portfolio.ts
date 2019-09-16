const api = '/api/portfolio/';

export const portolfioList: Portfolio[] = [
  {
    id: 1,
    name: 'Summary',
    brokerage: 'All',
    balance: 169_764.55,
    returns: 42_394.56,
    isGroup: true,
    isRetirement: false,
    isSavings: false,
  }, {
    id: 2,
    name: 'Stocks + VIG',
    brokerage: 'Robinhood',
    balance: 67_598.92,
    returns: 16_050.97,
    isGroup: false,
    isRetirement: false,
    isSavings: false,
  }, {
    id: 3,
    name: 'WD ESPP',
    brokerage: 'E*Trade',
    balance: 0,
    returns: 3_192.99,
    isGroup: false,
    isRetirement: false,
    isSavings: false,
  }, {
    id: 4,
    name: 'WD 401(k)',
    brokerage: 'T Rowe Price',
    balance: 45_051.61,
    returns: 13_190.63,
    isGroup: false,
    isRetirement: true,
    isSavings: false,
  }, {
    id: 5,
    name: 'Cisco 401(k)',
    brokerage: 'Fidelity',
    balance: 0,
    returns: 0,
    isGroup: false,
    isRetirement: true,
    isSavings: false,
  }, {
    id: 6,
    name: 'Roth 4-Fund',
    brokerage: 'Vanguard',
    balance: 33_830.51,
    returns: 5_830.51,
    isGroup: false,
    isRetirement: true,
    isSavings: false,
  }, {
    id: 7,
    name: 'HSA',
    brokerage: 'Health Equity',
    balance: 4_642.01,
    returns: 1_029.37,
    isGroup: false,
    isRetirement: true,
    isSavings: false,
  }, {
    id: 8,
    name: 'High Yield Savings',
    brokerage: 'Ally',
    balance: 3_191.82,
    returns: 54.92,
    isGroup: false,
    isRetirement: false,
    isSavings: true,
  },
];

export const summaryPortfolio: PortfolioData[] = [
  {
    date: new Date('11/30/2018'),
    balance: 151_335.450,
    transfers: 200,
    returns: -252.84 + 179.60,
    cumulativeReturns: 29_337.24,
  }, {
    date: new Date('12/31/2018'),
    balance: 134_018.48,
    transfers: -3_665.8,
    returns: -7_522.98 - 6_128.24,
    cumulativeReturns: 15_686.02,
  }, {
    date: new Date('1/31/2019'),
    balance: 146_936.46,
    transfers: 200,
    returns: 7_302.60 + 5_415.38,
    cumulativeReturns: 28_404,
  }, {
    date: new Date('2/28/2019'),
    balance: 153_900.11,
    transfers: 200,
    returns: 2_262.81 + 2_696.79,
    cumulativeReturns: 33_363.60,
  }, {
    date: new Date('3/29/2019'),
    balance: 159_131.80,
    transfers: 2_004.50,
    returns: 2_077.44 + 1_149.30,
    cumulativeReturns: 36_590.34,
  }, {
    date: new Date('4/30/2019'),
    balance: 168_763.34,
    transfers: 2_004.50,
    returns: 4_417.06 + 2_899.96,
    cumulativeReturns: 43_907.36,
  }, {
    date: new Date('5/31/2019'),
    balance: 160_642.88,
    transfers: 2_004.50,
    returns: -5_971.79 - 5_454.99,
    cumulativeReturns: 33_480.58,
  }, {
    date: new Date('6/28/2019'),
    balance: 170_769.05,
    transfers: 2_004.50,
    returns: 4_986.05 + 3_927.93,
    cumulativeReturns: 42_394.56,
  },
];

export const PortfolioSenarios: Scenario[] = [
  {
    scenarios: {
      GET: {
        delay: 100,
        description: 'Portfolio List',
        response: {
          body: portolfioList,
          status: 200,
        },
      },
    },
    url: `${api}`,
    usecases: ['Use Case 1'],
  }, {
    scenarios: {
      GET: {
        delay: 100,
        description: 'Summary Portfolio',
        response: {
          body: summaryPortfolio.slice(-6),
          status: 200,
        },
      },
    },
    url: `${api}1?range=180D`,
    usecases: ['Use Case 1'],
  },
];
