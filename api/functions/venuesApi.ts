const fetch = require("node-fetch");
import dotenv from "dotenv";
dotenv.config();
import Ajv from "ajv";
const ajv = new Ajv();
import { venueSchema, venuesSchema } from "../../schemas/venuesSchemas";

const api_key_token = process.env.API_TOKEN_PARAM! + process.env.API_KEY!;

// GET N VENUE
export async function getVenue(venue_id: any): Promise<any> {
  var endpoint = process.env.API_URL! + "venues/" + venue_id + api_key_token;
  var venue = await fetch(endpoint, { method: "GET" })
    .then((response: any) => response.json())
    .then((res: any) => {
      return ajv.validate(venueSchema, res.data) ? res.data : ajv.errors;
    })
    .catch((error: any) => {
      return error;
    });

  return venue;
}

// GET VENUES FROM N SEASON
export async function getVenuesSeason(season_id: any): Promise<any> {
  var endpoint =
    process.env.API_URL! + "venues/season/" + season_id + api_key_token;
  var venue = await fetch(endpoint, { method: "GET" })
    .then((response: any) => response.json())
    .then((res: any) => {
      return ajv.validate(venuesSchema, res.data) ? res.data : ajv.errors;
    })
    .catch((error: any) => {
      return error;
    });

  return venue;
}
