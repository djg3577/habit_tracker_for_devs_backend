import { Request, Response, Router } from "express";
import controllers from "../../controllers";
import githubAuthMiddleware from "../../middleware/githubAuth";

const route = Router();
export default (app: Router) => {
  app.use("/auth", route);

  //call all auth routes here
  route.post("/decode-jwt", githubAuthMiddleware, controllers.auth.decodeJWT);
};
