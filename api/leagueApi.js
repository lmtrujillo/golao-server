import fetch from 'node-fetch'
import dotenv from 'dotenv'
dotenv.config()

const api_key_token = process.env.API_TOKEN_PARAM + process.env.API_KEY;

// GET ALL THE LEAGUES
export function getLeagues() {
    var endpoint = process.env.API_URL + "leagues" + api_key_token;
    var leagues = []; 
    fetch(endpoint)
        .then(response => response.json())
        .then((res) => {
            leagues = res.data;
        })
        .catch((error) => {
            return error('Error:', error);
        });

    return leagues;
}

// GET N LEAGUE
export function getLeague(league_id) {
    var endpoint = process.env.API_URL + "leagues/" + league_id + api_key_token;
    var soccerLeague = {};

    fetch(endpoint)
        .then(response => response.json())
        .then((res) => {
            return soccerLeague = res.data;
        })
        .catch((error) => {
            return error('Error:', error);
        });
}