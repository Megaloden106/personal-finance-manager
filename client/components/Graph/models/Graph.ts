import { PortfolioData, PortfolioParam } from '@/store/models/portfolio';

export interface GraphProps {
  data: PortfolioData[];
  filter: PortfolioParam;
  height: number;
  width: number;
  setNext(next: PortfolioData, newDate?: string): void;
}

export interface StateProps {
  data: PortfolioData[];
  name: string;
}
