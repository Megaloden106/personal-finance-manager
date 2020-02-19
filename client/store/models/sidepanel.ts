export enum SidepanelTab {
  Portfolio = 'Portfolio',
  DataPoint = 'Data Point',
}

export interface SidepanelState {
  isOpen: boolean;
  selectedTab: SidepanelTab;
  dataPoint: PortfolioDataForm;
  portfolio: IPortfolioForm;
}

export interface PortfolioDataForm {
  date: string;
  portfolio: string;
  balance?: number;
  deposit?: number;
  withdrawal?: number;
}

export interface IPortfolioForm {
  name: string;
  brokerage: string;
  isRetirement: boolean;
  isSavings: boolean;
}
