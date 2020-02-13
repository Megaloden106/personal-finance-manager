import { IPortfolio } from 'store/models/portfolio';

export interface PortfolioListProps {
  portfolios: IPortfolio[];
  title: string | void;
}
