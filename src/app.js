import { HttpServer, envVariables, dbConnection } from "./configs";

const { port, mongoURI } = envVariables;
import { defaultMiddleware } from "./middlewares";
import { errorHandle } from "./middlewares";
import {
  authRouter,
  adminRouter,
  brandRouter,
  categoryRouter,
  productRouter,
} from "./routes";

// import { socketServer } from "./services";

import { initAccountAmin } from "./utils";
export let server;
const main = async () => {
  server = new HttpServer(port);
  server.registerMiddleware(defaultMiddleware);
  server.listen();

  dbConnection(mongoURI);
  // api
  server.registerRouter(authRouter);
  server.registerRouter(adminRouter);
  server.registerRouter(brandRouter);
  server.registerRouter(categoryRouter);
  server.registerRouter(productRouter);

  // initial default role
  // initialRole();
  initAccountAmin();
  server.registerMiddleware(errorHandle);

  // server.socketEventHandler(socketServer);
};
main();
