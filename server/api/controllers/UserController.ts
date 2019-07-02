import { Response } from 'express';
import BaseControllerMethod from './BaseControllerMethod';

class CreateUserMethod extends BaseControllerMethod {
  protected async executeLogic(): Promise<Response> {
    return this.send();
  }
}

export default {
  createUser: new CreateUserMethod().execute,
};
