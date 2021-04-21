import fetch from 'node-fetch'
import dotenv from 'dotenv'
dotenv.config()

const api_key_token = process.env.API_TOKEN_PARAM + process.env.API_KEY;

// GET N TEAM
export function getTeam(team_id) {
    var endpoint = process.env.API_URL + "teams/" + team_id + api_key_token;
    var teams = [];

    fetch(endpoint)
        .then(response => response.json())
        .then((res) => {
            return teams = res.data;
        })
        .catch((error) => {å
            return error('Error:', error);
        });
}

