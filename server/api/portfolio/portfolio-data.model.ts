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
  portfolioId?: number;
  // portfolioName?: string;
  date: number; // date in epoch
  balance?: number;
  deposit?: number;
  withdrawal?: number;
}

const portfolioDatumTable: Table<PortfolioDatumEntity, PortfolioDatumDTO> = {
  tableName: 'portfolio_data',
  columns: [
    { key: 'id', columnName: 'id' },
    { key: 'portfolioId', columnName: 'portfolio_id' },
    { key: 'date', columnName: 'date' },
    { key: 'balance', columnName: 'balance', nullable: true },
    { key: 'deposit', columnName: 'deposit', nullable: true },
    { key: 'withdrawal', columnName: 'withdrawal', nullable: true },
  ],
};

export const PortfolioDataModel = new BaseModel<PortfolioDatumEntity, PortfolioDatumDTO>(
  portfolioDatumTable,
);
