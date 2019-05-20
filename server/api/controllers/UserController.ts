import BaseControllerMethod from './BaseControllerMethod';

class CreateUserMethod extends BaseControllerMethod {
  protected async executeLogic(): Promise<any> {
    this.send();
  }
}

export default {
  createUser: new CreateUserMethod().execute,
};
