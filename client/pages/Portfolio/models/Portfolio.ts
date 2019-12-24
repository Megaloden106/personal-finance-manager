import { IPortfolio, PortfolioParam } from '@/store/models/portfolio';

export interface StateProps {
  portfolios: IPortfolio[];
  id: string;
}

export interface DispatchProps {
  onInit(): void;
  getPortfolioData(portfolio: IPortfolio, params?: PortfolioParam): void;
  getAnalyticsData(id: string): void;
}

export type PortfolioProps = StateProps & DispatchProps;
