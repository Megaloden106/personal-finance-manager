import { Epic, combineEpics } from 'redux-observable';
import { createEpic } from 'utils/action-util';
import * as PortfolioAction from 'store/actions/portfolio';
import * as PortfolioService from 'store/services/portfolio';

const requestPortfolioListEpic = createEpic(
  PortfolioAction.REQUEST_PORTFOLIO_LIST,
  PortfolioService.requestPortfolioList,
);

const requestSelectedPortfolioEpic = createEpic(
  PortfolioAction.REQUEST_SELECTED_PORTFOLIO,
  PortfolioService.requestSelectedPortfolio,
);

export const portfolioEpic: Epic = combineEpics(
  requestPortfolioListEpic,
  requestSelectedPortfolioEpic,
);
