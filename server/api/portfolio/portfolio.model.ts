import { BaseModel, Table } from '../BaseModel';

export interface PortfolioEntity {
  id: number;
  name: string;
  brokerage: string;
  is_retirement: boolean;
  is_savings: boolean;
}

export interface PortfolioDTO {
  id?: number;
  name: string;
  brokerage: string;
  isRetirement: boolean;
  isSavings: boolean;
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

export default new BaseModel<PortfolioEntity, PortfolioDTO>(portfolioTable);
