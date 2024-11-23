import express from "express";
import loaders from "./loaders";
const port = 6000;
async function startServer() {
  const app = express();
  await loaders({ expressApp: app });

  app.listen(port, (err?: unknown) => {
    if (err) {
      console.log({ err });
      process.exit(1);
    }
    console.log(`STARTING SERVER ON PORT ${port}`);
  });
}

startServer();
