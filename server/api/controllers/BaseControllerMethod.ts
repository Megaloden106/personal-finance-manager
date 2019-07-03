import { Request, Response } from 'express';

export default abstract class BaseController {
  private req: Request;
  private res: Response;

  protected abstract executeLogic(): Promise<Response>;

  public execute(req: Request, res: Response): void {
    this.req = req;
    this.res = res;

    this.executeLogic();
  }

  protected jsonResponse(code: number, message: string): Response {
    return this.res.status(code).json({ message });
  }

  protected send<T>(data?: T): Response {
    if (data) return this.res.json(data);

    return this.res.sendStatus(200);
  }

  protected created(): Response {
    return this.res.sendStatus(201);
  }

  protected clientError(message?: string): Response {
    return this.jsonResponse(400, message || 'Unauthorized');
  }

  protected unauthorized(message?: string): Response {
    return this.jsonResponse(401, message || 'Unauthorized');
  }

  protected paymentRequired(message?: string): Response {
    return this.jsonResponse(402, message || 'Payment required');
  }

  protected forbidden(message?: string): Response {
    return this.jsonResponse(403, message || 'Forbidden');
  }

  protected notFound(message?: string): Response {
    return this.jsonResponse(404, message || 'Not Found');
  }

  protected conflict(message?: string): Response {
    return this.jsonResponse(409, message || 'Conflicted');
  }

  protected tooMany(message?: string): Response {
    return this.jsonResponse(429, message || 'Too many requests');
  }

  protected fail(error: Error | string): Response {
    return this.res.status(500).json({
      message: error.toString(),
    });
  }
}
