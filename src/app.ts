import {container as app} from 'tsyringe';
import {EventEmitter} from 'events';
import {createMongoClient} from './db/createMongoClient';
import {MongoClient} from 'mongodb';

export async function bootstrapDependencies() {
  const mongoClient = await createMongoClient();
  const eventEmitter = new EventEmitter();

  app.register<EventEmitter>('EventEmitter', {useValue: eventEmitter});
  app.register<MongoClient>('MongoClient', {useValue: mongoClient});
}

export default app;
