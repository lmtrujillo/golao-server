import fetch from 'node-fetch'
import dotenv from 'dotenv'
dotenv.config()

const api_key_token = process.env.API_TOKEN_PARAM + process.env.API_KEY;

// GET SEASONS
export function getSeasons() {
    var endpoint = process.env.API_URL + "seasons" + api_key_token;
    var seasons = [];

    fetch(endpoint)
        .then(response => response.json())
        .then((res) => {
            return seasons = res.data;
        })
        .catch((error) => {
            return error('Error:', error);
        });
}

// GET N SEASON
export function getSeason(season_id) {
    var endpoint = process.env.API_URL + "seasons/" + season_id + api_key_token;
    var season = {};

    fetch(endpoint)
        .then(response => response.json())
        .then((res) => {
            return season = res.data;
        })
        .catch((error) => {
            return error('Error:', error);
        });
}