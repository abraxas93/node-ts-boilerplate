import Joi from 'joi';
import {EventEmitter} from 'events';
import {IUserRepository} from '../../domain/repositories';
import {ERR_USER_NOT_FOUND, EVENTS} from '../../constants';
import {inject, injectable} from 'tsyringe';

const schema = Joi.object({
  id: Joi.string().required(),
});

@injectable()
export class GetUserUseCase {
  constructor(
    @inject('IUserRepository')
    private readonly userRepo: IUserRepository,
    @inject('EventEmitter')
    private readonly eventEmitter: EventEmitter
  ) {}

  async execute(data: {id: string}) {
    try {
      const value = schema.validate(data);

      if (value.error) {
        return {data: null, error: new Error(value.error.message)};
      }

      const user = await this.userRepo.findById(data.id);

      if (!user) return {data: null, error: ERR_USER_NOT_FOUND};

      return {data: user.model, error: null};
    } catch (error) {
      this.eventEmitter.emit(EVENTS.ERROR, error);
      return {data: null, error: (error as Error).message};
    }
  }
}
