import fetch from 'node-fetch'
import dotenv from 'dotenv'
dotenv.config()
import Ajv from 'ajv'
const ajv = new Ajv()
import { teamSchema, teamsSchema, teamsBySeasonSchema, leaguesByTeamDataSchema } from '../schemas/teamsSchemas.js'

const api_key_token = process.env.API_TOKEN_PARAM + process.env.API_KEY;

// GET N TEAM
export async function getTeam(team_id) {
    var endpoint = process.env.API_URL + "teams/" + team_id + api_key_token;
    var teams = await fetch(endpoint)
        .then(response => response.json())
        .then((res) => {
            return (ajv.validate(teamSchema, res.data) ? res.data : ajv.errors);
        })
        .catch((error) => {
            return error;
        });
    
    return teams;
}

// GET N TEAM BY NAME
export async function getTeamByName(team_name) {
    var endpoint = process.env.API_URL + "teams/search/" + team_name + api_key_token;
    var teams = await fetch(endpoint)
        .then(response => response.json())
        .then((res) => {
            return (ajv.validate(teamsSchema, res.data) ? res.data : ajv.errors);
        })
        .catch((error) => {
            return error;
        });
    
    return teams;
}



// GET TEAMS BY SEASON
export async function getTeamsBySeason(season_id) {
    var endpoint = process.env.API_URL + "teams/season/" + season_id + api_key_token;
    var teams = await fetch(endpoint)
        .then(response => response.json())
        .then((res) => {
            return (ajv.validate(teamsBySeasonSchema, res.data) ? res.data : ajv.errors);
        })
        .catch((error) => {
            return error;
        });
    
    return teams;
}


// GET CURRENT LEAGUES BY TEAM
export async function getCurrentLeaguesByTeam(team_id) {
    var endpoint = process.env.API_URL + "teams/" + team_id + "/current" + api_key_token;
    var teams = await fetch(endpoint)
        .then(response => response.json())
        .then((res) => {
            return (ajv.validate(leaguesByTeamDataSchema, res.data) ? res.data : ajv.errors);
        })
        .catch((error) => {
            return error;
        });
    
    return teams;
}


// GET ALL LEAGUES BY TEAM
export async function getLeaguesByTeam(team_id) {
    var endpoint = process.env.API_URL + "teams/" + team_id + "/history" + api_key_token;
    var teams = await fetch(endpoint)
        .then(response => response.json())
        .then((res) => {
            return (ajv.validate(leaguesByTeamDataSchema, res.data) ? res.data : ajv.errors);
        })
        .catch((error) => {
            return error;
        });
    
    return teams;
}
