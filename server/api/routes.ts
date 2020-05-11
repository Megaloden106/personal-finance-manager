import { Router } from 'express';
import PortfolioController from './portfolio/portfolio.controller';
import LookupController from './lookup/lookup.controller';

const router = Router();

router.route('/portfolio')
  .get(PortfolioController.findAllPortfolios)
  .post(PortfolioController.addPortfolio)
  .patch(PortfolioController.updatePortfolio);

router.route('/portfolio/data')
  .post(PortfolioController.addPortfolioData)
  .put(PortfolioController.upsertPortfolioData);

router.route('/portfolio/:id')
  .get(PortfolioController.findOne)
  .post(PortfolioController.addPortfolioDataById)
  .put(PortfolioController.upsertPortfolioDataById);

router.route('/lookup/:dataType')
  .get(LookupController.getLookups);

export default router;
