import { Request, Response } from 'express';
import { PortfolioModel, PortfolioEntity, PortfolioDTO } from './portfolio.model';
import PortfolioQueries from './portfolio.query';
import { pool } from '../../database';

const getSumMoney = (num1: number, num2: number): number => (num1 * 100 + num2 * 100) / 100;

class PortfolioController {
  public static async getPortfolios(req: Request, res: Response): Promise<void> {
    try {
      const { rows } = await pool.query(PortfolioQueries.findAll);
      const result = rows.map((datum: PortfolioEntity): PortfolioDTO => ({
        id: datum.id,
        name: datum.name,
        brokerage: datum.brokerage,
        isRetirement: datum.is_retirement,
        isSavings: datum.is_savings,
        balance: datum.balance,
        returns: getSumMoney(datum.balance, -datum.cashflow),
      }));
      res.json(result);
    } catch (err) {
      res.status(500).json({
        message: err.toString(),
      });
    }
  }

  public static async addPortfolio(req: Request, res: Response): Promise<void> {
    try {
      const text = PortfolioQueries.add;
      const values = PortfolioModel.getParametizedValues(req.body);
      await pool.query(text, values);
      res.sendStatus(201);
    } catch (err) {
      res.status(500).json({
        message: err.toString(),
      });
    }
  }

  public static async updatePortfolio(req: Request, res: Response): Promise<void> {
    try {
      const text = PortfolioQueries.update;
      const values = PortfolioModel.getParametizedValues(req.body);
      await pool.query(text, values);
      res.sendStatus(200);
    } catch (err) {
      res.status(500).json({
        message: err.toString(),
      });
    }
  }
}

export default PortfolioController;
