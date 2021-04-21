import fetch from 'node-fetch'
import dotenv from 'dotenv'
dotenv.config()
import { getSeasons } from './seasonsApi.js'

const api_key_token = process.env.API_TOKEN_PARAM + process.env.API_KEY;

// GET N WEEK
export function getWeek(week_id) {
    var endpoint = process.env.API_URL + "rounds/" + week_id + api_key_token;
    var week = {};

    fetch(endpoint)
        .then(response => response.json())
        .then((res) => {
            return week = res.data;
        })
        .catch((error) => {
            return error('Error:', error);
        });
}


// GET N WEEK
export function getWeeksNSeason(season_id) {
    rounds_endpoint = process.env.API_URL + "rounds/season/" + season_id + api_key_token;
    var weeks = {};

    fetch(endpoint)
        .then(response => response.json())
        .then((res) => {
            return weeks = res.data;
        })
        .catch((error) => {
            return error('Error:', error);
        });
}

// GET ALL WEEKS FROM N LEAGUE
export function getWeeksFromNLeague(league_id) {
    var weeks = [];

    seasons = getSeasons();
    var current_season_id = seasons.find(x => (x.is_current_season === true &&  x.league_id === league_id)).id
 
    return weeks = getWeeksNSeason(current_season_id);
                        
                   
     
}