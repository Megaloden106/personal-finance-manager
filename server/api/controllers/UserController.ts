import BaseController from './BaseController';

class CreateUserController extends BaseController {
  protected async executeLogic(): Promise<any> {
    this.send();
  }
}

export default {
  createUser: new CreateUserController().execute,
};
