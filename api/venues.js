import fetch from 'node-fetch'
import dotenv from 'dotenv'
dotenv.config()

const api_key_token = process.env.API_TOKEN_PARAM + process.env.API_KEY;

// GET N VENUE
export async function getVenue(venue_id) {
    var endpoint = process.env.API_URL + "venues/" + venue_id + api_key_token;
    var venue = await fetch(endpoint)
        .then(response => response.json())
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            return error('Error:', error);
        });

    return venue;
}

// GET VENUE FROM N SEASON
export async function getVenueSeason(season_id) {
    var endpoint = process.env.API_URL + "venues/season/" + season_id + api_key_token;
    var venue = await fetch(endpoint)
        .then(response => response.json())
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            return error('Error:', error);
        });

    return venue;
}