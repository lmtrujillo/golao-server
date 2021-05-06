import fetch from 'node-fetch'
import dotenv from 'dotenv'
dotenv.config()
import { getSeasons } from './seasonsApi.js'

const api_key_token = process.env.API_TOKEN_PARAM + process.env.API_KEY;

// GET N WEEK
export async function getWeek(week_id) {
    var endpoint = process.env.API_URL + "rounds/" + week_id + api_key_token;
    var week = await fetch(endpoint)
        .then(response => response.json())
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            return error;
        });

    return week;
}


// GET WEEKS FROM N SEASON
export async function getWeeksNSeason(season_id) {
    var endpoint = process.env.API_URL + "rounds/season/" + season_id + api_key_token;
    var weeks = await fetch(endpoint)
        .then(response => response.json())
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            return error;
        });
    
    return weeks;
}

// GET WEEKS FROM N LEAGUE
export async function getWeeksFromNLeague(league_id) {
    var weeks = [];

    var seasons = await getSeasons();
    var current_season_id = seasons.find(x => (x.is_current_season === true &&  x.league_id === league_id)).id
 
    return weeks = await getWeeksNSeason(current_season_id);

}