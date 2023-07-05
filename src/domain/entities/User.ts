import {Entity} from './Entity';

export interface IUserModel {
  id: string;
  email: string;
  password: string;
}

export class User extends Entity<IUserModel> {
  constructor(model: IUserModel) {
    super(model);
  }

  get id() {
    return this.data.id;
  }
}
