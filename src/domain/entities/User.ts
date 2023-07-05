import {Entity} from './Entity';

export interface IUserModel {
  email: string;
  password: string;
}

export class User extends Entity<IUserModel> {
  private _id?: string | undefined;
  constructor(model: IUserModel, _id?: string) {
    super(model);
    this._id = _id;
  }

  get id() {
    return this._id;
  }
}
