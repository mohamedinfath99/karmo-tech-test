import morgan from "morgan";
import helmet from "helmet";
import express, { Request, Response, NextFunction } from "express";
import logger from "jet-logger";
import ENV from "@src/common/constants/ENV";
import HttpStatusCodes from "@src/common/constants/HttpStatusCodes";
import { RouteError } from "@src/common/util/route-errors";
import { NodeEnvs } from "@src/common/constants/enums";
import path from "path";
import apiRouter from "./routes";
import cors from "cors";

const server = async () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));

  if (ENV.node_env === NodeEnvs.dev) {
    app.use(morgan("dev"));
  }

  if (ENV.node_env === NodeEnvs.production) {
    // eslint-disable-next-line n/no-process-env
    if (!process.env.DISABLE_HELMET) {
      app.use(helmet());
    }
  }

  app.use("/api", apiRouter);

  const staticDir = path.join(__dirname, "public");
  app.use(express.static(staticDir));

  app.use((err: Error, _: Request, res: Response, next: NextFunction) => {
    if (ENV.node_env !== NodeEnvs.test.valueOf()) {
      logger.err(err, true);
    }
    let status = HttpStatusCodes.BAD_REQUEST;
    if (err instanceof RouteError) {
      status = Number(err.status);
      res.status(status).json({ error: err.message });
    }
    return next(err);
  });

  return app;
};

export default server;
