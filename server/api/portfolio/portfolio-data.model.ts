import { BaseModel, Table } from '../BaseModel';

export interface PortfolioDatumEntity {
  id: number;
  portfolio_id: number;
  date: number; // date in epoch
  balance: number;
  deposit: number;
  withdrawal: number;
}

export interface PortfolioDatumDTO {
  id?: number;
  portfolioId: number;
  date: number; // date in epoch
  balance: number;
  deposit: number;
  withdrawal: number;
}

const portfolioDatumTable: Table<PortfolioDatumEntity, PortfolioDatumDTO> = {
  tableName: 'portfolio_data',
  columns: [
    { key: 'id', columnName: 'id' },
    { key: 'date', columnName: 'date' },
    { key: 'portfolioId', columnName: 'portfolio_id' },
    { key: 'balance', columnName: 'balance' },
    { key: 'deposit', columnName: 'deposit' },
    { key: 'withdrawal', columnName: 'withdrawal' },
  ],
};

export const PortfolioDataModel = new BaseModel<PortfolioDatumEntity, PortfolioDatumDTO>(
  portfolioDatumTable,
);
