import path from "path";
import InstagramPlacesController from "./controllers/instagramPlacesController";
import { response, Router } from "express";


const routes = Router();

routes.get("/", (request, response) => {
  response.send({hello: "World"});
})

routes.get("/api/v1/place-information", (request, response) => {
  response.send({places: "here"});
  instagramPlacesController.returnInstagramPlaceID("new york");
})

export default routes;
