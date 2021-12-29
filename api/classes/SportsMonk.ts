import dotenv from 'dotenv'
dotenv.config()
import Ajv from 'ajv'
const ajv = new Ajv()
const api_key_token = process.env.API_TOKEN_PARAM + process.env.API_KEY;
import { matchesSchema, matchSchema } from '../../schemas/matchesSchemas';


export class SportsMonk extends SportsDataAPI {
    
    async updateMatchResults() {
        var processedData = this.getResults();
        this.storeMatchesInfo(processedData);
    }

    async getResults() {
        var endpoint = process.env.API_URL + "fixtures/updates" + api_key_token;
        var rawData = {};
        var match = await fetch(endpoint)
        .then(response => response.json())
        .then((res) => {
            rawData = res.data;
            this.processAPIMatchResults(rawData);
        })
        .catch((error) => {
            return error;
        });

        return match;
    }

    async processAPIMatchResults(rawData) {
        return (ajv.validate(matchesSchema, rawData) ? rawData : ajv.errors);
    }

    async storeMatchesInfo(processedMatchesData) {
        /* 
        Store date in hasura
        */

    }

    callEndpointWithLatestGamesUpdates() {}

    processLatestGameUpdatesResponse() {}

}
   
