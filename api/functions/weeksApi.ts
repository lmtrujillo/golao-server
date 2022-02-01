const fetch = require("node-fetch");
import dotenv from "dotenv";
dotenv.config();
import Ajv from "ajv";
const ajv = new Ajv();
import { weekSchema, weeksSchema } from "../../schemas/weeksSchemas";
import { getSeasons } from "./seasonsApi";

const api_key_token = process.env.API_TOKEN_PARAM! + process.env.API_KEY!;

// GET N WEEK
export async function getWeek(week_id: any): Promise<any> {
  var endpoint = process.env.API_URL! + "rounds/" + week_id + api_key_token;
  var week = await fetch(endpoint)
    .then((response: any) => response.json())
    .then((res: any) => {
      return ajv.validate(weekSchema, res.data) ? res.data : ajv.errors;
    })
    .catch((error: any) => {
      return error;
    });

  return week;
}

// GET WEEKS FROM N SEASON
export async function getWeeksNSeason(season_id: any): Promise<any> {
  var endpoint =
    process.env.API_URL! + "rounds/season/" + season_id + api_key_token;
  var weeks = await fetch(endpoint)
    .then((response: any) => response.json())
    .then((res: any) => {
      return ajv.validate(weeksSchema, res.data) ? res.data : ajv.errors;
    })
    .catch((error: any) => {
      return error;
    });

  return weeks;
}

// GET WEEKS FROM N LEAGUE
export async function getWeeksFromNLeague(league_id: any): Promise<any> {
  var seasons = await getSeasons();
  var current_season_id = seasons.find(
    (x: any) => x.is_current_season === true && x.league_id === league_id
  ).id;

  const weeks = await getWeeksNSeason(current_season_id);
  return ajv.validate(weeksSchema, weeks) ? weeks : ajv.errors;
}
