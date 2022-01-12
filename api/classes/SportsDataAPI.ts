type matchInfo = {
    id: number;
    home_team_id: number;
    away_team_id: number;
    home_team_goals: number;
    away_team_goals: number;
 }


export abstract class SportsDataAPI {   

    abstract getResults(): any;

    abstract callEndpointWithLatestGamesUpdates(): any;

    abstract processLatestGameUpdatesResponse(): any;

    async updateMatchResults(): Promise<void> {
        const newMatchesInfo: [matchInfo] = await this.getResults();
        this.storeMatchesInfo(newMatchesInfo);
    }

    async storeMatchesInfo(processedMatchesData: [matchInfo]): Promise<void> {
        /* 
        Store date in hasura
        */
    }

}
   
