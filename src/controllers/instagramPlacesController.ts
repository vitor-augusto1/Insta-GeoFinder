import dotenv from "dotenv";
dotenv.config();
import { Request, Response } from "express";
import axios from "axios";

class InstagramPlacesController {
  private async returnMediaFromAninstagramPlace(placeID: number | Promise<number> = 30630047) {
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
      console.log(error);
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
      const responseData = apiResponse.data;
      const places = responseData.places;
      const placesData = places[0].place.location;
      const placeID = placesData.pk;
      return placeID;
    } catch(error) {
      console.log(error);
    }
  }
}

export default new InstagramPlacesController();
