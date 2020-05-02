import { Router } from 'express';
import PortfolioController from './portfolio/portfolio.controller';

const router = Router();

router.route('/portfolio')
  .get(PortfolioController.getPortfolios)
  .post(PortfolioController.addPortfolio)
  .patch(PortfolioController.updatePortfolio);

export default router;
