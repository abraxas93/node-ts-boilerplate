import {injectable, inject} from 'tsyringe';
import {ICreateUser, IGetUser, IUserSignIn} from '../use-cases';

/*
 * Facade class to wrap use cases
 * Responsible for use cases orchestration and providing interface access to domain logic
 */

@injectable()
export class UserService {
  constructor(
    @inject('IGetUser')
    private readonly getUserUseCase: IGetUser,
    @inject('ICreateUser')
    private readonly createUserUseCase: ICreateUser,
    @inject('IUserSignIn')
    private readonly userSignInUseCase: IUserSignIn
  ) {}

  createUser(email: string, password: string) {
    return this.createUserUseCase.execute({email, password});
  }

  findUserById(id: string) {
    return this.getUserUseCase.execute({id});
  }

  signInUser(email: string, password: string) {
    return this.userSignInUseCase.execute({email, password});
  }
}
