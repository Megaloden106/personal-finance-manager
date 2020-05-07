import { Router } from 'express';
import PortfolioController from './portfolio/portfolio.controller';
import LookupController from './lookup/lookup.controller';

const router = Router();

router.route('/portfolio')
  .get(PortfolioController.getPortfolios)
  .post(PortfolioController.addPortfolio)
  .patch(PortfolioController.updatePortfolio);

router.route('/lookup/:dataType')
  .get(LookupController.getLookups);

export default router;
