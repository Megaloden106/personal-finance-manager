import { IPortfolio, PortfolioByType } from 'store/models/portfolio';
import { AppState } from 'store/models/store';

export const portfolioByTypeSelector = (state: AppState): PortfolioByType[] => {
  const portfolioList: IPortfolio[] = state.portfolio.list;
  const groups: IPortfolio[] = [];
  const personal: IPortfolio[] = [];
  const retirement: IPortfolio[] = [];
  const savings: IPortfolio[] = [];
  const portfoliosByType: PortfolioByType[] = [
    { type: 'group', portfolios: groups },
    { type: 'personal', portfolios: personal, label: 'Personal' },
    { type: 'retirement', portfolios: retirement, label: 'Retirement' },
    { type: 'savings', portfolios: savings, label: 'Savings' },
  ];

  portfolioList.forEach((portfolio: IPortfolio) => {
    if (portfolio.isGroup) groups.push(portfolio);
    else if (portfolio.isRetirement) retirement.push(portfolio);
    else if (portfolio.isSavings) savings.push(portfolio);
    else personal.push(portfolio);
  });

  return portfoliosByType;
};

export const portfolioListByNameSelector = (state: AppState): string[] => state.portfolio.list
  .filter(portfolio => !portfolio.isGroup)
  .map(portfolio => portfolio.name);
