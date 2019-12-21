import { PortfolioData, PortfolioParam } from '@/store/models/portfolio';

export interface GraphProps {
  data: PortfolioData[];
  filter: PortfolioParam;
  height: number;
  name: string | null;
  width: number;
  filterClick(filter: PortfolioParam): void;
}

export interface StateProps {
  data: PortfolioData[];
  name: string | null;
}
