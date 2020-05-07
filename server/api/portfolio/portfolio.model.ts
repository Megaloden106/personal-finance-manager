import { BaseModel, Table } from '../BaseModel';

export interface PortfolioEntity {
  id: number;
  name: string;
  brokerage: string;
  is_retirement: boolean;
  is_savings: boolean;
  balance: number;
  cashflow: number;
}

export interface PortfolioDTO {
  id?: number;
  name: string;
  brokerage: string;
  isRetirement: boolean;
  isSavings: boolean;
  balance: number;
  returns: number;
}

const portfolioTable: Table<PortfolioEntity, PortfolioDTO> = {
  tableName: 'portfolios',
  columns: [
    { key: 'id', columnName: 'id' },
    { key: 'name', columnName: 'name' },
    { key: 'brokerage', columnName: 'brokerage' },
    { key: 'isRetirement', columnName: 'is_retirement' },
    { key: 'isSavings', columnName: 'is_savings' },
  ],
};

export const PortfolioModel = new BaseModel<PortfolioEntity, PortfolioDTO>(portfolioTable);
