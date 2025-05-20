import morgan from 'morgan';
import helmet from 'helmet';
import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import logger from 'jet-logger';
import ENV from '@src/common/constants/ENV';
import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import { RouteError } from '@src/common/util/route-errors';
import { NodeEnvs } from '@src/common/constants/enums';
import path from 'path';
import apiRouter from './routes';
import cors from 'cors';

const server = async () => {
  const app = express();

  // Middleware setup
  app.use(express.json());
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));

  if (ENV.node_env === NodeEnvs.dev) {
    app.use(morgan('dev'));
  }

  if (ENV.node_env === NodeEnvs.production && !process.env.DISABLE_HELMET) {
    app.use(helmet());
  }

  // Routes
  app.use('/api', apiRouter);

  // Static files
  const staticDir = path.join(__dirname, 'public');
  app.use(express.static(staticDir));

  const errorHandler: ErrorRequestHandler = (err, _req: Request, res: Response, next: NextFunction) => {
    if (ENV.node_env !== NodeEnvs.test.valueOf()) {
      logger.err(err, true);
    }

    if (res.headersSent) {
      return next(err);
    }

    if (err instanceof RouteError) {
      const status = Number(err.status);
      res.status(status).json({ error: err.message });
    } else {
      res.status(HttpStatusCodes.BAD_REQUEST).json({
        error: 'An unexpected error occurred',
      });
    }
  };

  app.use(errorHandler);

  return app;
};

export default server;
