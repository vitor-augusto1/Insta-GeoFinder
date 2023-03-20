import path from "path";
import InstagramPlacesController from "./controllers/instagramPlacesController";
import { response, Router } from "express";


const routes = Router();

routes.get("/", (request, response) => {
  response.sendFile(path.join(__dirname, 'views/index.html'));
})

routes.get("/api/v1/place-information", async (request, response) => {
  await InstagramPlacesController.returnMediaByPlaceID(request, response);
})

export default routes;
