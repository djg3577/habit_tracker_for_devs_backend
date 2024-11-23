import { Router } from "express";
import authRoutes from "./auth/auth";
import activityRoutes from "./activity/activity";
import userRoutes from "./user/user";

export default (): Router => {
  const app = Router();

  //ALL API GO HERE
  authRoutes(app);
  activityRoutes(app);
  userRoutes(app);

  return app;
};
