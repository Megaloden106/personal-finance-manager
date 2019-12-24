import { PortfolioData, PortfolioParam } from '@/store/models/portfolio';

export interface GraphProps {
  data: PortfolioData[];
  filter: PortfolioParam;
  height: number;
  name: string;
  width: number;
  filterClick(filter: PortfolioParam): void;
}

export interface StateProps {
  data: PortfolioData[];
  name: string;
}
