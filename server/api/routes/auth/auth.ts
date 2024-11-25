import { Request, Response, Router } from "express";
import controllers from "../../controllers";

const route = Router();
export default (app: Router) => {
  app.use("/auth", route);

  route.post("/decode-jwt", controllers.auth.decodeJWT);
  route.post("/github", controllers.auth.GithubLogin);
};
