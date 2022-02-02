const fetch = require("node-fetch");
import dotenv from "dotenv";
dotenv.config();
import Ajv from "ajv";
const ajv = new Ajv();
import { leaguesSchema, leagueSchema } from "../../schemas/leaguesSchemas";

const api_key_token = process.env.API_TOKEN_PARAM! + process.env.API_KEY!;

// GET ALL THE LEAGUES
export async function getLeagues(): Promise<any> {
  var endpoint = process.env.API_URL! + "leagues" + api_key_token;
  var leagues = await fetch(endpoint, { method: "GET" })
    .then((response: any) => response.json())
    .then((res: any) => {
      return ajv.validate(leaguesSchema, res.data) ? res.data : ajv.errors;
    })
    .catch((error: any) => {
      return error;
    });

  return leagues;
}

// GET N LEAGUE
export async function getLeague(league_id: number) {
  var endpoint = process.env.API_URL! + "leagues/" + league_id + api_key_token;
  var soccerLeague = await fetch(endpoint, { method: "GET" })
    .then((response: any) => response.json())
    .then((res: any) => {
      return ajv.validate(leagueSchema, res.data) ? res.data : ajv.errors;
    })
    .catch((error: any) => {
      return error;
    });

  return soccerLeague;
}

// GET N LEAGUE BY NAME
export async function getLeagueByName(league_name: string) {
  var endpoint =
    process.env.API_URL! + "leagues/search/" + league_name + api_key_token;
  var soccerLeague = await fetch(endpoint, { method: "GET" })
    .then((response: any) => response.json())
    .then((res: any) => {
      return ajv.validate(leaguesSchema, res.data) ? res.data : ajv.errors;
    })
    .catch((error: any) => {
      return error;
    });

  return soccerLeague;
}
