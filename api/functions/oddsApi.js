import fetch from 'node-fetch'
import dotenv from 'dotenv'
dotenv.config()
import Ajv from 'ajv'
const ajv = new Ajv()
import { oddsSchema } from '../schemas/oddsSchemas.js'

const api_key_token = process.env.API_TOKEN_PARAM + process.env.API_KEY;

// GET ODDS FIXTURE AND BOOKMAKER
export async function getOddsFixtureBookmaker(fixture_id, bookmaker_id) {
    var endpoint = process.env.API_URL + "odds/fixture/" + fixture_id + "/bookmaker/" + bookmaker_id + api_key_token;
    var odds = await fetch(endpoint)
        .then(response => response.json())
        .then((res) => {
            return (ajv.validate(oddsSchema, res.data) ? res.data : ajv.errors);
        })
        .catch((error) => {
            return error;
        });

    return odds;
}

// GET ODDS FIXTURE AND MARKET
export async function getOddsFixtureMarket(fixture_id, market_id) {
    var endpoint = process.env.API_URL + "odds/fixture/" + fixture_id + "/market/" + market_id + api_key_token;
    var odds = await fetch(endpoint)
        .then(response => response.json())
        .then((res) => {
            return (ajv.validate(oddsSchema, res.data) ? res.data : ajv.errors);
        })
        .catch((error) => {
            return error;
        });

    return odds;
}

// GET ODDS BY FIXTURE ID
export async function getOddsFixture(fixture_id) {
    var endpoint = process.env.API_URL + "odds/fixture/" + fixture_id + api_key_token;
    var odds = await fetch(endpoint)
        .then(response => response.json())
        .then((res) => {
            return (ajv.validate(oddsSchema, res.data) ? res.data : ajv.errors);
        })
        .catch((error) => {
            return error;
        });

    return odds;
}

// GET INPLAY ODDS BY FIXTURE ID
export async function getInplayOddsFixture(fixture_id) {
    var endpoint = process.env.API_URL + "odds/inplay/fixture/" + fixture_id + api_key_token;
    var odds = await fetch(endpoint)
        .then(response => response.json())
        .then((res) => {
            return (ajv.validate(oddsSchema, res.data) ? res.data : ajv.errors);
        })
        .catch((error) => {
            return error;
        });

    return odds;
}