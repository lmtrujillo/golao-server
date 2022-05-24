import { TLeagueData, TLeagueDataRaw } from "./types";
import dotenv from "dotenv";
import { getLeague } from "../functions/leaguesApi";
import { getSeason } from "../functions/seasonsApi";
import { getWeeksNSeason } from "../functions/weeksApi";
dotenv.config();

const fetch = require("node-fetch");

const fromSportsMonkToGolaoDatabaseWeekId = async (
  week_id_sports_monk: number
): Promise<number> => {
  return fetch("https://golao-api.hasura.app/v1/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET,
    },
    body: JSON.stringify({
      query: `
          query getWeekId ($week_id_sports_monk: Int!) {
            week(where: {week_id_sports_monk: {_eq: $week_id_sports_monk}}) {
              week_id
            }
          }
            `,
      variables: {
        week_id_sports_monk: week_id_sports_monk,
      },
    }),
  })
    .then((res: any) => res.json())
    .then((result: any) => {
      return result.data?.week[0]!.week_id!;
    });
};

const getSoccerLeaguesData = async (
  league_id: number
): Promise<TLeagueData> => {
  const league_raw_data: TLeagueDataRaw = await getLeague(league_id);

  const season_weeks = await getWeeksNSeason(league_raw_data.current_season_id);

  return {
    active: league_raw_data.active,
    current_season_id: league_raw_data.current_season_id!.toString(),
    logo_url: league_raw_data.logo_path,
    total_number_of_weeks: season_weeks.length,
    current_week_id:
      (await fromSportsMonkToGolaoDatabaseWeekId(
        league_raw_data.current_round_id!
      )) || null,
    name: league_raw_data.name,
    soccer_league_sports_monk_id: league_raw_data.id,
  };
};

const storeNewSoccerLeaguesData = async (
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
                current_week_id,
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
  const soccer_league_data: TLeagueData = await getSoccerLeaguesData(564);

  console.log(soccer_league_data);

  storeNewSoccerLeaguesData(soccer_league_data);
})();
