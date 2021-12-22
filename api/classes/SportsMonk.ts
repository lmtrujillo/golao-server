import dotenv from 'dotenv'
dotenv.config()
import Ajv from 'ajv'
const ajv = new Ajv()
const api_key_token = process.env.API_TOKEN_PARAM + process.env.API_KEY;
import { matchSchema } from '../../schemas/matchesSchemas';


export class SportsMonk extends SportsDataAPI {   

    async getResults() {
        var endpoint = process.env.API_URL + "fixtures/updates" + api_key_token;
        var match = await fetch(endpoint)
        .then(response => response.json())
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            return error;
        });

        return match;
    }

    callEndpointWithLatestGamesUpdates() {}

    processLatestGameUpdatesResponse() {}

}
   
