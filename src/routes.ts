import path from "path";
import instagramPlacesController from "./controllers/instagramPlacesController";
import { response, Router } from "express";


const routes = Router();

routes.get("/", (request, response) => {
  response.send({hello: "World"});
})

routes.get("/api/v1/place-information", (request, response) => {
  response.send({places: "Here"});
})

export default routes;
