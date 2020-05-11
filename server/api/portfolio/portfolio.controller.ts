import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { PortfolioModel, PortfolioEntity } from './portfolio.model';
import PortfolioQueries from './portfolio.query';
import { pool } from '../../database';
import { PortfolioDataModel, PortfolioDatumEntity, PortfolioDatumDTO } from './portfolio-data.model';

interface PortfolioDataCounter {
  [dateOrId: string]: {
    balance: number;
    deposit: number;
    withdrawal: number;
  };
}

const defaultValues = {
  balance: 0,
  deposit: 0,
  withdrawal: 0,
};

class PortfolioController {
  public static async findAllPortfolios(req: Request, res: Response): Promise<void> {
    try {
      const { rows } = await pool.query<PortfolioEntity>(PortfolioQueries.findAll);
      const result = PortfolioModel.convertEntitiesToDTOsCustom(rows);
      res.json(result);
    } catch (err) {
      res.status(500).json({
        message: err.toString(),
      });
    }
  }

  public static async addPortfolio(req: Request, res: Response): Promise<void> {
    try {
      await pool.query<PortfolioEntity>(
        PortfolioQueries.add,
        PortfolioModel.getParametizedValues(req.body),
      );
      res.sendStatus(201);
    } catch (err) {
      res.status(500).json({
        message: err.toString(),
      });
    }
  }

  public static async updatePortfolio(req: Request, res: Response): Promise<void> {
    try {
      await pool.query<PortfolioEntity>(
        PortfolioQueries.update,
        PortfolioModel.getParametizedValues(req.body),
      );
      res.sendStatus(200);
    } catch (err) {
      res.status(500).json({
        message: err.toString(),
      });
    }
  }

  public static async findOne(req: Request, res: Response): Promise<void> {
    try {
      const { rows } = await pool.query<PortfolioDatumEntity>(
        PortfolioQueries.findData,
        [req.params.id],
      );
      const result = PortfolioDataModel.convertEntitiesToDTOs(rows);
      res.json(result);
    } catch (err) {
      res.status(500).json({
        message: err.toString(),
      });
    }
  }

  public static async addPortfolioData(req: Request, res: Response): Promise<void> {
    try {
      const data: PortfolioDatumDTO[] = Array.isArray(req.body) ? req.body : [req.body];
      await PortfolioController.addPortfolioDataQuery(data);
      await PortfolioController.updateSummaryPortfolio(data);
      res.sendStatus(201);
    } catch (err) {
      res.status(500).json({
        message: err.toString(),
      });
    }
  }

  public static async addPortfolioDataById(req: Request, res: Response): Promise<void> {
    try {
      let data: PortfolioDatumDTO[] = Array.isArray(req.body) ? req.body : [req.body];
      data = data.map((datum): PortfolioDatumDTO => ({
        portfolioId: parseInt(req.params.id, 10),
        ...datum,
      }));
      await PortfolioController.addPortfolioDataQuery(data);
      await PortfolioController.updateSummaryPortfolio(data);
      res.sendStatus(201);
    } catch (err) {
      res.status(500).json({
        message: err.toString(),
      });
    }
  }

  public static async upsertPortfolioData(req: Request, res: Response): Promise<void> {
    try {
      const data: PortfolioDatumDTO[] = Array.isArray(req.body) ? req.body : [req.body];
      await PortfolioController.upsertPortfolioDataQuery(data);
      await PortfolioController.updateSummaryPortfolio(data);
      res.sendStatus(201);
    } catch (err) {
      res.status(500).json({
        message: err.toString(),
      });
    }
  }

  public static async upsertPortfolioDataById(req: Request, res: Response): Promise<void> {
    try {
      let data: PortfolioDatumDTO[] = Array.isArray(req.body) ? req.body : [req.body];
      data = data.map((datum): PortfolioDatumDTO => ({
        portfolioId: parseInt(req.params.id, 10),
        ...datum,
      }));
      await PortfolioController.upsertPortfolioDataQuery(data);
      await PortfolioController.updateSummaryPortfolio(data);
      res.sendStatus(201);
    } catch (err) {
      res.status(500).json({
        message: err.toString(),
      });
    }
  }

  private static async addPortfolioDataQuery(data: PortfolioDatumDTO[]): Promise<QueryResult> {
    const values = data
      .map((datum): any[] => PortfolioDataModel.getParametizedValues(datum))
      .reduce((acc, curr): any[] => acc.concat(curr), []);
    return pool.query<PortfolioDatumEntity>(PortfolioQueries.addData(data), values);
  }

  private static async upsertPortfolioDataQuery(data: PortfolioDatumDTO[]): Promise<QueryResult> {
    const values = data
      .map((datum): any[] => PortfolioDataModel.getParametizedValues(datum))
      .reduce((acc, curr): any[] => acc.concat(curr), []);
    return pool.query<PortfolioDatumEntity>(PortfolioQueries.upsertDataById(data), values);
  }

  private static async updateSummaryPortfolio(data: PortfolioDatumDTO[]): Promise<void> {
    const earliestDate = data.reduce((acc, curr): number => Math.min(acc, curr.date), Infinity);
    const { rows: dateRows } = await pool.query<PortfolioDatumEntity>(
      PortfolioQueries.findAllDataExceptSummaryAfterTargetDate,
      [earliestDate],
    );
    const dtos = PortfolioController
      .countValuesByDate(PortfolioDataModel.convertEntitiesToDTOs(dateRows));
    const values = dtos
      .map((datum): any[] => PortfolioDataModel.getDefinedParametizedValues(datum))
      .reduce((acc, curr): any[] => acc.concat(curr), []);
    await pool.query<PortfolioDatumEntity>(PortfolioQueries.upsertDataForSummary(dtos), values);
  }

  private static countValuesByDate(dateRows: PortfolioDatumDTO[]): PortfolioDatumDTO[] {
    const portfolioIds = new Set<number>();
    const dataCounter: PortfolioDataCounter = {};
    const portfolioCounter: PortfolioDataCounter = {};
    dateRows.forEach(({
      date,
      portfolioId,
      balance,
      deposit,
      withdrawal,
    }): void => {
      if (!dataCounter[date]) {
        dataCounter[date] = { ...defaultValues };
      }
      portfolioIds.add(portfolioId);
      portfolioCounter[portfolioId] = { balance, deposit, withdrawal };
      dataCounter[date].balance = Array
        .from(portfolioIds)
        .reduce((acc, id): number => acc + (portfolioCounter[id]
          ? portfolioCounter[id].balance
          : 0
        ), 0);
      dataCounter[date].deposit += deposit;
      dataCounter[date].withdrawal += withdrawal;
    });
    return Object
      .keys(dataCounter)
      .map((key): PortfolioDatumDTO => ({
        date: parseInt(key, 10),
        balance: dataCounter[key].balance,
        deposit: dataCounter[key].deposit,
        withdrawal: dataCounter[key].withdrawal,
      }));
  }
}

export default PortfolioController;
