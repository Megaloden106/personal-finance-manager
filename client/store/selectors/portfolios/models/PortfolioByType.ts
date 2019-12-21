import { IPortfolio } from '@/store/models/portfolio';

export interface PortfolioByType {
  type: string;
  portfolios: IPortfolio[];
  label?: string;
}
