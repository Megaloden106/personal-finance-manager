import { Request, Response } from 'express';
import PortfolioModel from './portfolio.model';

class PortfolioController {
  public static async getPortfolios(req: Request, res: Response): Promise<void> {
    const result = await PortfolioModel.findAll();
    res.json(result);
  }

  public static async addPortfolio(req: Request, res: Response): Promise<void> {
    await PortfolioModel.add(req.body);
    res.sendStatus(200);
  }

  public static async updatePortfolio(req: Request, res: Response): Promise<void> {
    const result = await PortfolioModel.update(req.body);
    res.json(result);
  }
}

export default PortfolioController;
