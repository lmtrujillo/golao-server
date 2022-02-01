import { getMatchesTimeframeTeam } from "../functions/matchesApi";
import { TMatchDataRaw, TMatchData } from "./types";
import dotenv from "dotenv";
dotenv.config();

const fetch = require("node-fetch");

const getMatchesData = async (
  start_date: string,
  end_date: string,
  team_id: number
): Promise<TMatchData[]> => {
  const matches_raw_data = await getMatchesTimeframeTeam(
    start_date,
    end_date,
    team_id
  );

  const matches_data: TMatchData[] = await Promise.all(
    matches_raw_data.map(async (match: TMatchDataRaw): Promise<TMatchData> => {
      // const venue = await getVenue(team.venue_id);

      return {
        week_id: 1,
        time_status: "TEST 1",
        starting_date_time: "2000-01-01T00:00:00",
        minute: 1,
        second: 1,
        home_team_id: 1,
        away_team_id: 2,
        winner_team_id: 1,
        soccer_league_id: 2,
        home_team_score: 0,
        away_team_score: 0,
        match_id_sports_monk: 1,
      };
    })
  );

  return matches_data;
};

const storeTeamsData = async (matches_data: any): Promise<void> => {
  fetch("https://golao-api.hasura.app/v1/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET,
    },
    body: JSON.stringify({
      query: `
      mutation updateMatches($objects: [match_insert_input!]!) {
        insert_match(on_conflict: {constraint: match_match_id_sports_monk_key, update_columns: [        time_status,
          week_id,
          starting_date_time,
              minute,
              second,
              home_team_id,
              away_team_id,
              winner_team_id,
              soccer_league_id,
              home_team_score,
              away_team_score,]}, objects: $objects) {
          affected_rows
        }
      }      
        `,
      variables: {
        objects: matches_data,
      },
    }),
  })
    .then((res: any) => res.json())
    .then((result: any) => console.log(result));
};

(async () => {
  const teams_data: TMatchData[] = await getMatchesData(
    "2020-09-19",
    "2020-09-21",
    939
  );

  storeTeamsData(teams_data);
})();
