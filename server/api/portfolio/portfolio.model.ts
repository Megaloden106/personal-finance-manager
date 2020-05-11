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
    { key: 'brokerage', columnName: 'brokerage', nullable: true },
    { key: 'isRetirement', columnName: 'is_retirement', nullable: true },
    { key: 'isSavings', columnName: 'is_savings', nullable: true },
  ],
};

export const getSumMoney = (
  num1: number,
  num2: number,
): number => Math.trunc(num1 * 100 + num2 * 100) / 100;

class CPortfolioModel<E, D> extends BaseModel<E, D> {
  public convertEntitiesToDTOsCustom(entities: PortfolioEntity[]): PortfolioDTO[] {
    return entities.map((datum): PortfolioDTO => ({
      id: datum.id,
      name: datum.name,
      brokerage: datum.brokerage,
      isRetirement: datum.is_retirement,
      isSavings: datum.is_savings,
      balance: datum.balance,
      returns: getSumMoney(datum.balance, -datum.cashflow),
    }));
  }
}

export const PortfolioModel = new CPortfolioModel<PortfolioEntity, PortfolioDTO>(portfolioTable);
