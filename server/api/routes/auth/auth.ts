import { Router } from "express";

const route = Router();
export default (app: Router) => {
  app.use("/auth", route);

  //call all auth routes here
  route.post("/decode-jwt");
};
