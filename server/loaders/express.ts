import { Application } from "express";
import cors from "cors"
import bodyParser from "body-parser";
import cookieParser from "cookie-parser"
import routes from "../api/routes";

export default ({ app }: { app: Application }) => {
  // enables cross origin resource sharing
  app.use(cors())

  // flexibility on PUT POST DELETE calls
  app.use(require("method-override")())

  // req.body turns into json
  app.use(bodyParser.json())

  //turns cookies into json
  app.use(cookieParser())

  //ALL API
  app.use(routes())
};
