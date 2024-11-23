import { Application } from "express";
export default ({ app }: { app: Application }) => {
  //testing route
  app.get("/WHATEVER", (req, res)=>{
    res.status(200).end()
  })
};
