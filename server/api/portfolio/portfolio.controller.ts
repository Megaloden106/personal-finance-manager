import { Request, Response } from 'express';
import PortfolioModel from './portfolio.model';

class PortfolioController {
  public static async getPortfolios(req: Request, res: Response): Promise<void> {
    try {
      const result = await PortfolioModel.findAll();
      res.json(result);
    } catch (err) {
      res.status(500).json({
        message: err.toString(),
      });
    }
  }

  public static async addPortfolio(req: Request, res: Response): Promise<void> {
    try {
      const result = await PortfolioModel.add(req.body);
      res.status(201).json(result);
    } catch (err) {
      res.status(500).json({
        message: err.toString(),
      });
    }
  }

  public static async updatePortfolio(req: Request, res: Response): Promise<void> {
    try {
      const result = await PortfolioModel.update(req.body.id, req.body);
      res.json(result);
    } catch (err) {
      res.status(500).json({
        message: err.toString(),
      });
    }
  }
}

export default PortfolioController;
