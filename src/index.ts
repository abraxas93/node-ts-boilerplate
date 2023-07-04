import {initLogger} from './logger';

const logger = initLogger(__filename);
async function main() {
  logger.info('testing logger inside app');
}

main();
