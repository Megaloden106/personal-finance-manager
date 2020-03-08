export enum SidepanelTab {
  Portfolio = 'Portfolio',
  DataPoint = 'Data Point',
}

export interface SidepanelState {
  readonly isOpen: boolean;
  readonly selectedTab: SidepanelTab;
  readonly dataPoint: PortfolioDataForm;
  readonly portfolio: IPortfolioForm;
}

export interface PortfolioDataForm {
  date: string;
  portfolio: string;
  balance?: string;
  deposit?: string;
  withdrawal?: string;
}

export interface IPortfolioForm {
  name: string;
  brokerage: string;
  isRetirement: boolean;
  isSavings: boolean;
}
