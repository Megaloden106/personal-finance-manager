import { createAction } from '@/utils/action-util';
import { PortfolioParam, Portfolio } from '@/store/models/portfolio';

export const REQUEST_PORTFOLIO_LIST = '[Portfolio] Request Portfolio List';
export const REQUEST_PORTFOLIO_LIST_SUCCESS = '[Portfolio] Request Portfolio List Success';
export const REQUEST_PORTFOLIO_LIST_ERROR = '[Portfolio] Request Portfolio List Error';

export const requestPortfolioList = () => createAction(REQUEST_PORTFOLIO_LIST);

export const REQUEST_SELECTED_PORTFOLIO = '[Portfolio] Request Selected Portfolio';
export const REQUEST_SELECTED_PORTFOLIO_SUCCESS = '[Portfolio] Request Selected Portfolio Success';
export const REQUEST_SELECTED_PORTFOLIO_ERROR = '[Portfolio] Request Selected Portfolio Error';

export const requestSelectedPortfolio = (
  portfolio: Portfolio,
  params: PortfolioParam = {},
) => createAction(
  REQUEST_SELECTED_PORTFOLIO,
  portfolio,
  false,
  params,
);
