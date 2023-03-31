import dotenv from "dotenv";
dotenv.config();
import { Request, Response } from "express";
import axios from "axios";

class InstagramPlacesController {
  private async returnMediaFromAninstagramPlace(placeID: number | Promise<number>) {
    const options = {
      method: 'POST',
      url: 'https://rocketapi-for-instagram.p.rapidapi.com/instagram/location/get_media',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': `${process.env.RAPID_API}`,
        'X-RapidAPI-Host': 'rocketapi-for-instagram.p.rapidapi.com'
      },
      data: `{"id":${placeID},"page":null,"max_id":null}`
    };
    try {
      const apiResponse = await axios.request(options);
      const responseBody = apiResponse.data.response.body;
      const sections = responseBody.sections;
      return sections;
    } catch(error) {
      return false;
    }
  }

  private async returnInstagramPlaceID(placeName: string) {
    const options = {
      method: 'GET',
      url: 'https://instagram-data12.p.rapidapi.com/search/',
      params: {query: `${placeName}`, context: 'place'},
      headers: {
        'X-RapidAPI-Key': `${process.env.RAPID_API}`,
        'X-RapidAPI-Host': 'instagram-data12.p.rapidapi.com'
      }
    };
    try {
      const apiResponse = await axios.request(options);
      if (apiResponse.status !== 200) { throw new Error("Request Failed") };
      const responseData = apiResponse.data;
      const places = responseData.places;
      const firstPlace = places[0];
      if (firstPlace == undefined) { throw new Error("ID not found") };
      const placesID = firstPlace.place.location.pk;
      return placesID;
    } catch(error) {
      return false;
    }
  }

  public async returnMediaByPlaceID(request: Request, response: Response) {
    const placeNameProvidedByUser = request.query.place_id as string;
    try {
      const instagramPlaceID = await this.returnInstagramPlaceID(placeNameProvidedByUser);
      if (instagramPlaceID === false) { throw new Error("Place Not Found.") };
      console.log(instagramPlaceID);
      const instagramMedia = await this.returnMediaFromAninstagramPlace(instagramPlaceID);
      if (instagramMedia === false) { throw new Error("No media for this place.") };
      response.status(200).send({media: instagramMedia});
    } catch(error) {
      let message = "Internal server error.";
      const theThrewErrorisAnInstanceOfTheErrorClass = error instanceof Error;
      if (theThrewErrorisAnInstanceOfTheErrorClass) { message = error.message };
      console.log(message);
      response.status(500).send({ error: message });
    }
  }
}

export default new InstagramPlacesController();
