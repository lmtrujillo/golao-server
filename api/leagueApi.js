import fetch from 'node-fetch'
import dotenv from 'dotenv'
dotenv.config()

const api_key_token = process.env.API_TOKEN_PARAM + process.env.API_KEY;

// GET ALL THE LEAGUES
export async function getLeagues(){
    var endpoint = process.env.API_URL + "leagues" + api_key_token;
    var leagues = await fetch(endpoint)
        .then(response => response.json())
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            return error('Error:', error);
        });

    return leagues;
}

// GET N LEAGUE
export async function getLeague(league_id) {
    var endpoint = process.env.API_URL + "leagues/" + league_id + api_key_token;
    var soccerLeague = await fetch(endpoint)
        .then(response => response.json())
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            return error('Error:', error);
        });
    
    return soccerLeague;
}