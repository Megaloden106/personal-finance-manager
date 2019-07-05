import { BehaviorSubject, empty, Observable } from 'rxjs';

const user = new BehaviorSubject({
  username: 'Guest',
  accessLevel: 0,
});

const portfolio = new BehaviorSubject<PortfolioList>({
  list: [
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
      name: '4-Fund',
      brokerage: 'Vanguard',
      balance: 18_179.36,
      returns: 3_013.72,
      isGroup: false,
      isRetirement: false,
      isSavings: false,
    }, {
      id: 4,
      name: 'WD ESPP',
      brokerage: 'E*Trade',
      balance: 0,
      returns: 3_192.99,
      isGroup: false,
      isRetirement: false,
      isSavings: false,
    }, {
      id: 5,
      name: 'Crypto',
      brokerage: 'Cryptocurrency',
      balance: 0,
      returns: -18.59,
      isGroup: false,
      isRetirement: false,
      isSavings: false,
    }, {
      id: 6,
      name: 'WD 401(k)',
      brokerage: 'T Rowe Price',
      balance: 45_051.61,
      returns: 13_190.63,
      isGroup: false,
      isRetirement: true,
      isSavings: false,
    }, {
      id: 7,
      name: 'Cisco 401(k)',
      brokerage: 'Fidelity',
      balance: 0,
      returns: 0,
      isGroup: false,
      isRetirement: true,
      isSavings: false,
    }, {
      id: 8,
      name: '4-Fund',
      brokerage: 'Vanguard',
      balance: 33_830.51,
      returns: 5_830.51,
      isGroup: false,
      isRetirement: true,
      isSavings: false,
    }, {
      id: 9,
      name: 'WD HSA',
      brokerage: 'Health Equity',
      balance: 4_642.01,
      returns: 1_029.37,
      isGroup: false,
      isRetirement: true,
      isSavings: false,
    }, {
      id: 10,
      name: 'Cisco HSA',
      brokerage: 'Charles Schwabs',
      balance: 0,
      returns: 0,
      isGroup: false,
      isRetirement: true,
      isSavings: false,
    }, {
      id: 11,
      name: 'High Yield Savings',
      brokerage: 'Ally',
      balance: 3_191.82,
      returns: 54.92,
      isGroup: false,
      isRetirement: false,
      isSavings: true,
    },
  ],
  data: [
    {
      date: new Date('12/31/2018'),
      balance: 134_018.48,
      deposit: 0,
      withdrawal: 0,
      returns: -7_522.98 - 6_128.24,
      cumulativeReturns: 15_686.02,
    }, {
      date: new Date('1/31/2019'),
      balance: 146_936.46,
      deposit: 0,
      withdrawal: 0,
      returns: 7_302.60 + 5_415.38,
      cumulativeReturns: 28_404,
    }, {
      date: new Date('2/28/2019'),
      balance: 153_900.11,
      deposit: 0,
      withdrawal: 0,
      returns: 2_262.81 + 2_696.79,
      cumulativeReturns: 33_363.60,
    }, {
      date: new Date('3/29/2019'),
      balance: 159_131.80,
      deposit: 0,
      withdrawal: 0,
      returns: 2_077.44 + 1_149.30,
      cumulativeReturns: 36_590.34,
    }, {
      date: new Date('4/30/2019'),
      balance: 168_763.34,
      deposit: 0,
      withdrawal: 0,
      returns: 4_417.06 + 2_899.96,
      cumulativeReturns: 43_907.36,
    }, {
      date: new Date('5/31/2019'),
      balance: 160_642.88,
      deposit: 0,
      withdrawal: 0,
      returns: -5_971.79 - 5_454.99,
      cumulativeReturns: 33_480.58,
    }, {
      date: new Date('6/28/2019'),
      balance: 170_769.05,
      deposit: 0,
      withdrawal: 0,
      returns: 4_986.05 + 3_927.93,
      cumulativeReturns: 42_394.56,
    },
  ],
});

const summary = new BehaviorSubject({
  id: 1,
  name: 'Summary',
  data: [
    {
      date: new Date('12/31/2018'),
      balance: 134_018.48,
      deposit: 0,
      withdrawal: 0,
      returns: -7_522.98 - 6_128.24,
      cumulativeReturns: 15_686.02,
    }, {
      date: new Date('1/31/2019'),
      balance: 146_936.46,
      deposit: 0,
      withdrawal: 0,
      returns: 7_302.60 + 5_415.38,
      cumulativeReturns: 28_404,
    }, {
      date: new Date('2/28/2019'),
      balance: 153_900.11,
      deposit: 0,
      withdrawal: 0,
      returns: 2_262.81 + 2_696.79,
      cumulativeReturns: 33_363.60,
    }, {
      date: new Date('3/29/2019'),
      balance: 159_131.80,
      deposit: 0,
      withdrawal: 0,
      returns: 2_077.44 + 1_149.30,
      cumulativeReturns: 36_590.34,
    }, {
      date: new Date('4/30/2019'),
      balance: 168_763.34,
      deposit: 0,
      withdrawal: 0,
      returns: 4_417.06 + 2_899.96,
      cumulativeReturns: 43_907.36,
    }, {
      date: new Date('5/31/2019'),
      balance: 160_642.88,
      deposit: 0,
      withdrawal: 0,
      returns: -5_971.79 - 5_454.99,
      cumulativeReturns: 33_480.58,
    }, {
      date: new Date('6/28/2019'),
      balance: 170_769.05,
      deposit: 0,
      withdrawal: 0,
      returns: 4_986.05 + 3_927.93,
      cumulativeReturns: 42_394.56,
    },
  ],
});

type ReturnType = UserState | PortfolioList | PortfolioData;

function getJSON(url: '/api/user/'): Observable<UserState>;
function getJSON(url: '/api/portfolio/'): Observable<PortfolioList>;
function getJSON(url: string): Observable<PortfolioData>;
function getJSON(url: string): Observable<ReturnType> {
  switch (url) {
    case '/api/user/':
      return user.asObservable();
    case '/api/portfolio/':
      return portfolio.asObservable();
    case '/api/portfolio/1':
      return summary.asObservable();
    case '/api/portfolio/2':
      return summary.asObservable();
    default:
      return empty();
  }
}

export default { getJSON };
