import { BaseModel } from '../BaseModel';

const portfolioTable = {
  tableName: 'portfolios',
  columns: [
    { key: 'name', columnName: 'name' },
    { key: 'brokerage', columnName: 'brokerage' },
    { key: 'isRetirement', columnName: 'is_retirement' },
    { key: 'isSavings', columnName: 'is_savings' },
  ],
};

export default new BaseModel(portfolioTable);
