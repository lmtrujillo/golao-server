const fetch = require("node-fetch");
import dotenv from "dotenv";
dotenv.config();
import Ajv from "ajv";
const ajv = new Ajv();
import { seasonSchema, seasonsSchema } from "../../schemas/seasonsSchemas";

const api_key_token = process.env.API_TOKEN_PARAM! + process.env.API_KEY!;

// GET SEASONS
export async function getSeasons(): Promise<any> {
  var endpoint = process.env.API_URL! + "seasons" + api_key_token;
  var seasons = await fetch(endpoint, { method: "GET" })
    .then((response: any) => response.json())
    .then((res: any) => {
      return ajv.validate(seasonsSchema, res.data) ? res.data : ajv.errors;
    })
    .catch((error: any) => {
      return error;
    });

  return seasons;
}

// GET N SEASON
export async function getSeason(season_id: any): Promise<any> {
  var endpoint = process.env.API_URL! + "seasons/" + season_id + api_key_token;
  var season = await fetch(endpoint, { method: "GET" })
    .then((response: any) => response.json())
    .then((res: any) => {
      return ajv.validate(seasonSchema, res.data) ? res.data : ajv.errors;
    })
    .catch((error: any) => {
      return error;
    });

  return season;
}
