import mongoose from 'mongoose';
import { Server } from 'http';
import config from './config';
import app from './app';
import { logger, errorLogger } from './shared/logger';

// Handle uncaught exception
process.on('uncaughtException', (error) => {
  errorLogger.error(error);
  process.exit(1);
});

let server: Server;
async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info('📋 Database connected successfully');

    server = app.listen(config.port, () => {
      logger.info(`Application running on port ${config.port}`);
    });
  } catch (error) {
    errorLogger.error('Database connection failed: ' + error);
  }

  //  Handle Unhandle rejection
  process.on('unhandledRejection', (error) => {
    if (server) {
      server.close(() => {
        errorLogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

bootstrap();

process.on('SIGTERM', () => {
  logger.info('SIGTERM is received');
  if (server) {
    server.close();
  }
});
