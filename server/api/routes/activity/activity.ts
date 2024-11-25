import { Router } from "express";
import controllers from "../../controllers";
import githubAuthMiddleware from "../../middleware/githubAuth";

const route = Router();
export default (app: Router) => {
  app.use("/activities", route);

  route.post("/", githubAuthMiddleware, controllers.activity.logActivity);

  route.get("/", githubAuthMiddleware, controllers.activity.getActivityTotals);

  route.get(
    "/dates",
    githubAuthMiddleware,
    controllers.activity.getActivityDates,
  );
};
