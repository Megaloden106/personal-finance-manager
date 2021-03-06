import { IPortfolio } from 'store/models/portfolio';

const portolfioList: IPortfolio[] = [
  {
    id: '1',
    name: 'Summary',
    brokerage: 'All',
    balance: 176510.56,
    returns: 43279.24,
    isGroup: true,
    isRetirement: false,
    isSavings: false,
  }, {
    id: '2',
    name: 'ESPP',
    brokerage: 'E*Trade',
    balance: 0,
    returns: 3192.99,
    isGroup: false,
    isRetirement: false,
    isSavings: false,
  }, {
    id: '3',
    name: '401(k)',
    brokerage: 'T Rowe Price',
    balance: 46417.66,
    returns: 14570.88,
    isGroup: false,
    isRetirement: true,
    isSavings: false,
  }, {
    id: '4',
    name: 'Roth',
    brokerage: 'Vanguard',
    balance: 34670.20,
    returns: 6670.2,
    isGroup: false,
    isRetirement: true,
    isSavings: false,
  }, {
    id: '5',
    name: 'HSA',
    brokerage: 'Health Equity',
    balance: 6918.25,
    returns: 1186.40,
    isGroup: false,
    isRetirement: false,
    isSavings: true,
  },
];

export default portolfioList;
