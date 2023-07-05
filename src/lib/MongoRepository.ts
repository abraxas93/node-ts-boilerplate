import {
  MongoClient,
  Filter,
  Collection,
  UpdateFilter,
  WithId,
  Document,
  OptionalUnlessRequiredId,
  InsertOneResult,
  UpdateResult,
} from 'mongodb';

export interface IMongoDbRepository<T extends Document, E> {
  findOne(filter: Filter<T>): Promise<E | null>;
  findAll(filter?: Filter<T>): Promise<E[]>;
  update(filter: Filter<T>, update: UpdateFilter<T>): Promise<void>;
  updateOne(filter: Filter<T>, update: UpdateFilter<T>): Promise<UpdateResult>;
  delete(filter: Filter<T>): Promise<void>;
  deleteOne(filter: Filter<T>): Promise<void>;
  create(document: OptionalUnlessRequiredId<T>): Promise<InsertOneResult<T>>;
  createMany(documents: OptionalUnlessRequiredId<T>[]): Promise<void>;
}

export abstract class MongoDbRepository<T extends Document, E>
  implements IMongoDbRepository<T, E>
{
  protected collection: Collection<T>;

  constructor(client: MongoClient, dbName: string, collectionName: string) {
    this.collection = client.db(dbName).collection<T>(collectionName);
  }

  protected abstract getEntityClass(): new (doc: WithId<T>) => E;

  async findOne(filter: Filter<T>): Promise<E | null> {
    const document = await this.collection.findOne(filter);
    if (!document) return null;
    return new (this.getEntityClass())(document);
  }

  async findAll(filter: Filter<T> = {}): Promise<E[]> {
    const documents = await this.collection.find(filter).toArray();
    return documents.map(document => new (this.getEntityClass())(document));
  }

  async update(filter: Filter<T>, update: UpdateFilter<T>): Promise<void> {
    await this.collection.updateMany(filter, update);
  }

  updateOne(filter: Filter<T>, update: UpdateFilter<T>): Promise<UpdateResult> {
    return this.collection.updateOne(filter, update);
  }

  async delete(filter: Filter<T>): Promise<void> {
    await this.collection.deleteMany(filter);
  }

  async deleteOne(filter: Filter<T>): Promise<void> {
    await this.collection.deleteOne(filter);
  }

  async create(
    document: OptionalUnlessRequiredId<T>
  ): Promise<InsertOneResult<T>> {
    return this.collection.insertOne(document);
  }

  async createMany(documents: OptionalUnlessRequiredId<T>[]): Promise<void> {
    await this.collection.insertMany(documents);
  }
}
