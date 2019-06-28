import { BehaviorSubject, empty, Observable } from 'rxjs';

const user = new BehaviorSubject({
  username: 'Test User',
  accessLevel: 0,
  portfolios: [
    {
      name: 'Summary',
      brokerage: 'All',
      balance: 169166.99,
      returns: 22239.09 + 20050.51,
      isGroup: true,
      isRetirement: false,
      isSavings: false,
    }, {
      name: 'Stocks + VIG',
      brokerage: 'Robinhood',
      balance: 67598.92,
      returns: 16050.97,
      isGroup: false,
      isRetirement: false,
      isSavings: false,
    }, {
      name: '4-Fund',
      brokerage: 'Vanguard',
      balance: 18179.36,
      returns: 3013.72,
      isGroup: false,
      isRetirement: false,
      isSavings: false,
    }, {
      name: 'WD ESPP',
      brokerage: 'E*Trade',
      balance: 0,
      returns: 3192.99,
      isGroup: false,
      isRetirement: false,
      isSavings: false,
    }, {
      name: 'Crypto',
      brokerage: 'Cryptocurrency',
      balance: 0,
      returns: -18.59,
      isGroup: false,
      isRetirement: false,
      isSavings: false,
    }, {
      name: 'WD 401(k)',
      brokerage: 'T Rowe Price',
      balance: 45051.61,
      returns: 13190.63,
      isGroup: false,
      isRetirement: true,
      isSavings: false,
    }, {
      name: 'Cisco 401(k)',
      brokerage: 'Fidelity',
      balance: 0,
      returns: 0,
      isGroup: false,
      isRetirement: true,
      isSavings: false,
    }, {
      name: '4-Fund',
      brokerage: 'Vanguard',
      balance: 33830.51,
      returns: 5830.51,
      isGroup: false,
      isRetirement: true,
      isSavings: false,
    }, {
      name: 'WD HSA',
      brokerage: 'Health Equity',
      balance: 4642.01,
      returns: 1029.37,
      isGroup: false,
      isRetirement: true,
      isSavings: false,
    }, {
      name: 'Cisco HSA',
      brokerage: 'Charles Schwabs',
      balance: 0,
      returns: 0,
      isGroup: false,
      isRetirement: true,
      isSavings: false,
    }, {
      name: 'High Yield Savings',
      brokerage: 'Ally',
      balance: 3191.82,
      returns: 54.92,
      isGroup: false,
      isRetirement: false,
      isSavings: true,
    },
  ],
});

const ajax = {
  getJSON: (url: string): Observable<any> => {
    switch (url) {
      case '/api/user/':
        return user.asObservable();
      default:
        return empty();
    }
  },
};

export default ajax;
