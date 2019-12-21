import { PortfolioByType } from './models/PortfolioByType';
import { IPortfolio } from '@/store/models/portfolio';

export const portfolioByTypeSelector = (portfolioList: IPortfolio[]): PortfolioByType[] => {
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
