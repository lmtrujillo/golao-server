import dotenv from 'dotenv'
dotenv.config()
import Ajv from 'ajv'
const ajv = new Ajv()
const fetch = require('node-fetch');
const api_key_token = process.env.API_TOKEN_PARAM! + process.env.API_KEY!;
import { matchesSchema } from '../../schemas/matchesSchemas';
import { SportsDataAPI } from '../classes/SportsDataAPI';


export class SportsMonk extends SportsDataAPI {
    
    async updateMatchResults() {
        var processedData = this.getResults();
        this.storeMatchesInfo(processedData);
    }

    async getResults() {
        var endpoint = process.env.API_URL! + "fixtures/updates" + api_key_token;
        var rawData = {};
        var match = await fetch(endpoint, {method: 'GET'})
        .then((response: any) => response.json())
        .then((res: any) => {
            rawData = res.data;
            return this.processAPIMatchResults(rawData);
        })
        .catch((error: any) => {
            return error;
        });

        return match;
    }

    async processAPIMatchResults(rawData: any) {
        return (ajv.validate(matchesSchema, rawData) ? rawData : ajv.errors);
    }

    async storeMatchesInfo(processedMatchesData: any) {
        /* 
        Store date in hasura
        */

    }

    callEndpointWithLatestGamesUpdates() {}

    processLatestGameUpdatesResponse() {}

}
   
