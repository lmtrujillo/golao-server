import { getMatchesFromNWeekLeague } from "../functions/matchesApi";
import { TMatchDataRaw, TMatchData } from "./types";
import dotenv from "dotenv";
dotenv.config();

const fetch = require("node-fetch");

const getMatchesData = async (
  n_week: number,
  league_id: number
): Promise<TMatchData[]> => {
  const matches_raw_data = await getMatchesFromNWeekLeague(n_week, league_id);

  const matches_data: TMatchData[] = await Promise.all(
    matches_raw_data.map(async (match: TMatchDataRaw): Promise<TMatchData> => {
      return {
        week_id: match.round_id,
        time_status: match.time.status,
        starting_date_time:
          match.time.starting_at.date! + "T" + match.time.starting_at.time!,
        minute: match.time.minute || 0,
        second: match.time.second || 0,
        home_team_id: match.localteam_id,
        away_team_id: match.visitorteam_id,
        winner_team_id: match.winner_team_id,
        soccer_league_id: match.league_id,
        home_team_score: match.scores.localteam_score,
        away_team_score: match.scores.visitorteam_score,
        match_id_sports_monk: match.id,
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
  const matches_data: TMatchData[] = await getMatchesData(27, 501);

  storeTeamsData(matches_data);
})();
