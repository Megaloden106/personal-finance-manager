import { PortfolioByType } from '@/store/selectors/portfolios/models/PortfolioByType';
import { IPortfolio } from '@/store/models/portfolio';

export interface ParentProps {
  portfolioClick(portfolio: IPortfolio): void;
}

export interface StateProps {
  portfoliosByType: PortfolioByType[];
}

export type SidebarProps = ParentProps & StateProps;
