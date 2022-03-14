import express from "express";
import log from "datalog";
import { Server } from "socket.io";
import http from "http";

export class HttpServer {
  constructor(port) {
    this.port = port;
    this.app = express();
    this.server = http.Server(this.app);
    this.io = new Server(this.server, {
      cors: {
        origin: "*",
      },
    });
  }

  getApp() {
    return this.app;
  }
  registerMiddleware(middleware) {
    middleware(this.app);
  }

  registerRouter(router) {
    this.app.use(router);
  }

  socketEventHandler(eventsHandler) {
    eventsHandler(this.io);
  }

  listen() {
    this.server.listen(this.port, () => {
      log.info(`server is listening on port ${this.port}`);
    });
  }
}
