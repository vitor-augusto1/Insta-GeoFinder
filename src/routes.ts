import path from "path";
import { Router } from "express";

const routes = Router();

routes.get("/", (request, response) => {
  response.send({hello: "World"});
})

export default routes;
