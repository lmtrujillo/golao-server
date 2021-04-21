import fetch from 'node-fetch'
import dotenv from 'dotenv'
dotenv.config()

const api_key_token = process.env.API_TOKEN_PARAM + process.env.API_KEY;

// GET N TEAM
export async function getTeam(team_id) {
    var endpoint = process.env.API_URL + "teams/" + team_id + api_key_token;
    var teams = await fetch(endpoint)
        .then(response => response.json())
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            return error('Error:', error);
        });
    
    return teams;
}

