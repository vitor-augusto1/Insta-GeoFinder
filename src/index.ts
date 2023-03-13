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

  private middlewares(): void {
    this.express.set("views", path.join(__dirname, "views"));
    this.express.use('/public', express.static(path.join(__dirname, 'public')));
    this.express.use(express.json());
    this.express.use(cors());
  }
}

export default new App().express;
