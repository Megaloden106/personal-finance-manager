import { IPortfolio, PortfolioParam } from '@/store/models/portfolio';

export interface StateProps {
  portfolios: IPortfolio[];
  id: string | null;
}

export interface DispatchProps {
  onInit(): void;
  getPortfolioData(portfolio: IPortfolio, params?: PortfolioParam): void;
  getAnalyticsData(id: string): void;
}

export type PortfolioProps = StateProps & DispatchProps;
