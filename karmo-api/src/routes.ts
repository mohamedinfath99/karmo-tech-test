import { Router } from "express";
import ENV from "./common/constants/ENV";
import { ApiResponse } from "./common/types/api-response.type";
import { ApiRequest } from "./common/types/api-request.type";
import journeyRouter from "./routes/journey.router";

/* Base API router */
const apiRouter = Router();

apiRouter.get("/", async (req: ApiRequest, res: ApiResponse) => {
  res.json({
    message: "Karmo API",
    data: {
      status: "Online",
      time: new Date().toISOString(),
      env: ENV.node_env,
    },
  });
});

/* API Routes */
apiRouter.use("/karmo", journeyRouter);

export default apiRouter;
