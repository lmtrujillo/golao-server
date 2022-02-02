const fetch = require("node-fetch");
import dotenv from "dotenv";
dotenv.config();
import Ajv from "ajv";
const ajv = new Ajv();
import { getSeasons } from "./seasonsApi";
import { getWeeksNSeason } from "./weeksApi";
import { matchSchema, matchesSchema } from "../../schemas/matchesSchemas";

const api_key_token = process.env.API_TOKEN_PARAM! + process.env.API_KEY!;

// GET N MATCH
export async function getMatch(match_id: any): Promise<any> {
  var endpoint = process.env.API_URL! + "fixtures/" + match_id + api_key_token;
  var match = await fetch(endpoint)
    .then((response: any) => response.json())
    .then((res: any) => {
      return ajv.validate(matchSchema, res.data) ? res.data : ajv.errors;
    })
    .catch((error: any) => {
      return error;
    });

  return match;
}

// GET MATCHES FROM TIMEFRAME
export async function getMatchesTimeframe(
  start_date: any,
  end_date: any
): Promise<any> {
  var endpoint =
    process.env.API_URL! +
    "fixtures/between/" +
    start_date +
    "/" +
    end_date +
    api_key_token;

  var matches = await fetch(endpoint)
    .then((response: any) => response.json())
    .then((res: any) => {
      return ajv.validate(matchesSchema, res.data) ? res.data : ajv.errors;
    })
    .catch((error: any) => {
      return error;
    });

  return matches;
}

// GET MATCHES FROM N LEAGUE & N WEEK
export async function getMatchesFromNWeekLeague(
  n_week: number,
  league_id: number
): Promise<any> {
  var matches = [];

  var seasons = await getSeasons();
  var current_season_id = seasons.find(
    (x: any) => x.is_current_season === true && x.league_id === league_id
  ).id;

  var rounds = await getWeeksNSeason(current_season_id);
  var n_round = rounds.find((x: any) => x.name === n_week);
  var round_start_date = n_round.start;
  var round_end_date = n_round.end;

  matches = await getMatchesTimeframe(round_start_date, round_end_date);
  return ajv.validate(matchesSchema, matches) ? matches : ajv.errors;
}

// GET MATCHES FROM TIMEFRAME FOR TEAM
export async function getMatchesTimeframeTeam(
  start_date: any,
  end_date: any,
  team_id: any
): Promise<any> {
  var endpoint =
    process.env.API_URL! +
    "fixtures/between/" +
    start_date +
    "/" +
    end_date +
    "/" +
    team_id +
    api_key_token;
  var matches = await fetch(endpoint)
    .then((response: any) => response.json())
    .then((res: any) => {
      return ajv.validate(matchesSchema, res.data) ? res.data : ajv.errors;
    })
    .catch((error: any) => {
      return error;
    });

  return matches;
}
