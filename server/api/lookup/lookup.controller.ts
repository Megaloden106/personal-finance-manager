import { Request, Response } from 'express';
import LookupQueries from './lookup.query';
import { pool } from '../../database';
import { LookupModel, LookupEntity } from './lookup.model';

class LookupController {
  public static async getLookups(req: Request, res: Response): Promise<void> {
    try {
      const text = LookupQueries.findAll;
      const values = [req.params.dataType];
      const { rows } = await pool.query<LookupEntity>(text, values);
      const result = LookupModel.convertEntitiesToDTOs(rows);
      res.json(result);
    } catch (err) {
      res.status(500).json({
        message: err.toString(),
      });
    }
  }
}

export default LookupController;
