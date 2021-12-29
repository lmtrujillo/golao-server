import dotenv from 'dotenv'
dotenv.config()
import Ajv from 'ajv'
const ajv = new Ajv()
import { getSeasons } from './seasonsApi.js'
import { getWeeksNSeason } from './weeksApi.js'
import { matchSchema, matchesSchema } from '../schemas/matchesSchemas.js'


const api_key_token = process.env.API_TOKEN_PARAM + process.env.API_KEY;

// GET N MATCH
export async function getMatch(match_id) {
    var endpoint = process.env.API_URL + "fixtures/" + match_id + api_key_token;
    var match = await fetch(endpoint)
        .then(response => response.json())
        .then((res) => {
            return (ajv.validate(matchSchema, res.data) ? res.data : ajv.errors);
        })
        .catch((error) => {
            return error;
        });

    return match;
}

// GET MATCHES FROM TIMEFRAME
export async function getMatchesTimeframe(start_date, end_date) {
  var endpoint = process.env.API_URL + "fixtures/between/" + start_date + "/" + end_date + api_key_token;
  var matches = await fetch(endpoint)
        .then(response => response.json())
        .then((res) => {
            return (ajv.validate(matchesSchema, res.data) ? res.data : ajv.errors);
        })
        .catch((error) => {
            return error;
        });
    
    return matches;
}

// GET MATCHES FROM N LEAGUE & N WEEK
export async function getMatchesFromNWeekLeague(n_week, league_id) {
    var matches = [];

    var seasons = await getSeasons();
    var current_season_id = seasons.find(x => (x.is_current_season === true &&  x.league_id === league_id)).id;

    var rounds = await getWeeksNSeason(current_season_id);
    var n_round = rounds.find(x => (x.name === n_week));
    var round_start_date = n_round.start;
    var round_end_date = n_round.end;
 
    matches = await getMatchesTimeframe(round_start_date, round_end_date);
    return (ajv.validate(matchesSchema, matches) ? matches : ajv.errors)
}

// GET MATCHES FROM TIMEFRAME FOR TEAM
export async function getMatchesTimeframeTeam(start_date, end_date, team_id) {
    var endpoint = process.env.API_URL + "fixtures/between/" + start_date + "/" + end_date + "/" + team_id + api_key_token;
    var matches = await fetch(endpoint)
        .then(response => response.json())
        .then((res) => {
            return (ajv.validate(matchesSchema, res.data) ? res.data : ajv.errors);
        })
        .catch((error) => {
            return error;
        });
      
      return matches;
  }