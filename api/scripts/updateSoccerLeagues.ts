import { TLeagueData, TLeagueDataRaw } from "./types";
import dotenv from "dotenv";
import { getLeague } from "../functions/leaguesApi";
dotenv.config();

const fetch = require("node-fetch");

const getSoccerLeaguesData = async (
  league_id: number
): Promise<TLeagueData> => {
  const league_raw_data: TLeagueDataRaw = await getLeague(league_id);

  return {
    active: league_raw_data.active,
    current_season_id: league_raw_data.current_season_id!.toString(),
    logo_url: league_raw_data.logo_path,
    total_number_of_weeks: 20,
    current_week_number: league_raw_data.current_round_id! || 0,
    name: league_raw_data.name,
    soccer_league_sports_monk_id: league_raw_data.id,
  };
};

const storeSoccerLeaguesData = async (
  league_data: TLeagueData
): Promise<void> => {
  fetch("https://golao-api.hasura.app/v1/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET,
    },
    body: JSON.stringify({
      query: `
      mutation updateLeagues($objects: [soccer_league_insert_input!]!) {
        insert_soccer_league(on_conflict: {constraint: soccer_league_soccer_league_sports_monk_id_key, update_columns: 
            [    
                active,
                current_season_id,
                logo_url,
                total_number_of_weeks,
                current_week_number,
                name,
                soccer_league_sports_monk_id,
            ]
        }, objects: $objects) {
            affected_rows
      }
    }
          `,
      variables: {
        objects: league_data,
      },
    }),
  })
    .then((res: any) => res.json())
    .then((result: any) => console.log(result));
};

(async () => {
  const soccer_team_data: TLeagueData = await getSoccerLeaguesData(501);

  storeSoccerLeaguesData(soccer_team_data);
})();
