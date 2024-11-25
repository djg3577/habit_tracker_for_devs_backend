import { Request, Response, Router } from "express";
import authRoutes from "./auth/auth";
import activityRoutes from "./activity/activity";

export default (): Router => {
  const app = Router();

  //ALL API GO HERE
  authRoutes(app);
  activityRoutes(app);

  return app;
};
