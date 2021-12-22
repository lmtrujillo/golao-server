import fetch from 'node-fetch'
import dotenv from 'dotenv'
dotenv.config()
import Ajv from 'ajv'
const ajv = new Ajv()
import { venueSchema, venuesSchema } from '../schemas/venuesSchemas.js'

const api_key_token = process.env.API_TOKEN_PARAM + process.env.API_KEY;

// GET N VENUE
export async function getVenue(venue_id) {
    var endpoint = process.env.API_URL + "venues/" + venue_id + api_key_token;
    var venue = await fetch(endpoint)
        .then(response => response.json())
        .then((res) => {
            return (ajv.validate(venueSchema, res.data) ? res.data : ajv.errors);
        })
        .catch((error) => {
            return error;
        });

    return venue;
}

// GET VENUES FROM N SEASON
export async function getVenuesSeason(season_id) {
    var endpoint = process.env.API_URL + "venues/season/" + season_id + api_key_token;
    var venue = await fetch(endpoint)
        .then(response => response.json())
        .then((res) => {
            return (ajv.validate(venuesSchema, res.data) ? res.data : ajv.errors);
        })
        .catch((error) => {
            return error;
        });

    return venue;
}