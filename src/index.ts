import express from "express";
import cors from "cors";
import path from "path";

import routes from "./routes";

class App {
  public express: express.Application;

  public constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
  }
}

export default new App().express;
