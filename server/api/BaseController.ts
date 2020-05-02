import { Response } from 'express';

export default abstract class BaseController {
  protected static jsonResponse(res: Response, code: number, message: string): Response {
    return res.status(code).json({ message });
  }

  protected static send<T>(res: Response, dto?: T): Response {
    if (dto) {
      res.type('application/json');
      return res.json(dto);
    }

    return res.sendStatus(200);
  }

  protected static created(res: Response): Response {
    return res.sendStatus(201);
  }

  protected static clientError(res: Response, message?: string): Response {
    return BaseController.jsonResponse(res, 400, message || 'Unauthorized');
  }

  protected static unauthorized(res: Response, message?: string): Response {
    return BaseController.jsonResponse(res, 401, message || 'Unauthorized');
  }

  protected static paymentRequired(res: Response, message?: string): Response {
    return BaseController.jsonResponse(res, 402, message || 'Payment required');
  }

  protected static forbidden(res: Response, message?: string): Response {
    return BaseController.jsonResponse(res, 403, message || 'Forbidden');
  }

  protected static notFound(res: Response, message?: string): Response {
    return BaseController.jsonResponse(res, 404, message || 'Not Found');
  }

  protected static conflict(res: Response, message?: string): Response {
    return BaseController.jsonResponse(res, 409, message || 'Conflicted');
  }

  protected static tooMany(res: Response, message?: string): Response {
    return BaseController.jsonResponse(res, 429, message || 'Too many requests');
  }

  protected static fail(res: Response, error: Error | string): Response {
    return res.status(500).json({
      message: error.toString(),
    });
  }
}
