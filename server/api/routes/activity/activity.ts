import { Router } from "express";

const route = Router()
export default (app:Router) =>{
  app.use("/activities", route)

  //Will use the log activity in the activity controller here
  app.post("/")

  //Will use the get activity in the activity controller here
  app.get("/")

  //Will use the get dates in the activity controller here
  app.get("/dates")
}
