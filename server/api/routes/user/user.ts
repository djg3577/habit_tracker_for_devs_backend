import { Router } from "express";

const route = Router();

export default (app: Router) => {
  app.use("/users", route);

  //will yse the create user in user controller here
  route.post("/");

  //will use the get user in the user controller here
  route.get("/:id");
};
