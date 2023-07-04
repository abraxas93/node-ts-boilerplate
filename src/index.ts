import 'reflect-metadata';
import {initLogger} from './logger';
import app, {bootstrapDependencies} from './app';

const logger = initLogger(__filename);
async function main() {
  logger.info('bootstrap dependencies');
  await bootstrapDependencies();
}

main();
