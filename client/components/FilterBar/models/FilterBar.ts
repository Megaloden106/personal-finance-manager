import { PortfolioParam } from '@/store/models/portfolio';

export interface FilterBarProps {
  filter: PortfolioParam;
  filterClick(filter: PortfolioParam): void;
}
