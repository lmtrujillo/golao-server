const fetch = require("node-fetch");
import dotenv from "dotenv";
dotenv.config();
import Ajv from "ajv";
const ajv = new Ajv();
import {
  teamSchema,
  teamsSchema,
  teamsBySeasonSchema,
  leaguesByTeamDataSchema,
  teamsByCountrySchema,
} from "../../schemas/teamsSchemas";

const api_key_token = process.env.API_TOKEN_PARAM! + process.env.API_KEY!;

// GET N TEAM
export async function getTeam(team_id: any): Promise<any> {
  var endpoint = process.env.API_URL! + "teams/" + team_id + api_key_token;
  var teams = await fetch(endpoint, { method: "GET" })
    .then((response: any) => response.json())
    .then((res: any) => {
      return ajv.validate(teamSchema, res.data) ? res.data : ajv.errors;
    })
    .catch((error: any) => {
      return error;
    });

  return teams;
}

// GET N TEAM BY NAME
export async function getTeamByName(team_name: any): Promise<any> {
  var endpoint =
    process.env.API_URL! + "teams/search/" + team_name + api_key_token;
  var teams = await fetch(endpoint, { method: "GET" })
    .then((response: any) => response.json())
    .then((res: any) => {
      return ajv.validate(teamsSchema, res.data) ? res.data : ajv.errors;
    })
    .catch((error: any) => {
      return error;
    });

  return teams;
}

// GET TEAMS BY SEASON
export async function getTeamsBySeason(season_id: any): Promise<any> {
  var endpoint =
    process.env.API_URL! + "teams/season/" + season_id + api_key_token;
  var teams = await fetch(endpoint, { method: "GET" })
    .then((response: any) => response.json())
    .then((res: any) => {
      return ajv.validate(teamsBySeasonSchema, res.data)
        ? res.data
        : ajv.errors;
    })
    .catch((error: any) => {
      return error;
    });

  return teams;
}

// GET TEAMS BY COUNTRY
export async function getTeamsByCountry(country_id: any): Promise<any> {
  var endpoint =
    process.env.API_URL! + "countries/" + country_id + "/teams" + api_key_token;
  var teams = await fetch(endpoint, { method: "GET" })
    .then((response: any) => response.json())
    .then((res: any) => {
      return ajv.validate(teamsByCountrySchema, res.data)
        ? res.data
        : ajv.errors;
    })
    .catch((error: any) => {
      return error;
    });

  return teams;
}

// GET CURRENT LEAGUES BY TEAM
export async function getCurrentLeaguesByTeam(team_id: any): Promise<any> {
  var endpoint =
    process.env.API_URL! + "teams/" + team_id + "/current" + api_key_token;
  var teams = await fetch(endpoint, { method: "GET" })
    .then((response: any) => response.json())
    .then((res: any) => {
      return ajv.validate(leaguesByTeamDataSchema, res.data)
        ? res.data
        : ajv.errors;
    })
    .catch((error: any) => {
      return error;
    });

  return teams;
}

// GET ALL LEAGUES BY TEAM
export async function getLeaguesByTeam(team_id: any): Promise<any> {
  var endpoint =
    process.env.API_URL! + "teams/" + team_id + "/history" + api_key_token;
  var teams = await fetch(endpoint, { method: "GET" })
    .then((response: any) => response.json())
    .then((res: any) => {
      return ajv.validate(leaguesByTeamDataSchema, res.data)
        ? res.data
        : ajv.errors;
    })
    .catch((error: any) => {
      return error;
    });

  return teams;
}
