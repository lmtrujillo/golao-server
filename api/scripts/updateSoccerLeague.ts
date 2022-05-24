import { TLeagueData, TLeagueDataRaw, TLeagueDataUpdate } from "./types";
import dotenv from "dotenv";
import { getLeague } from "../functions/leaguesApi";
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
): Promise<TLeagueDataUpdate> => {
  const league_raw_data: TLeagueDataRaw = await getLeague(league_id);

  console.log(league_raw_data);

  return {
    active: league_raw_data.active,
    current_season_id: league_raw_data.current_season_id!.toString(),
    current_week_id:
      (await fromSportsMonkToGolaoDatabaseWeekId(
        league_raw_data.current_round_id!
      )) || null,
    soccer_league_sports_monk_id: league_raw_data.id,
  };
};

const updateSoccerLeaguesData = async (
  league_data: TLeagueDataUpdate
): Promise<void> => {
  fetch("https://golao-api.hasura.app/v1/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET,
    },
    body: JSON.stringify({
      query: `
      mutation updateLeagues($active: Boolean!, $current_season_id: String!, $current_week_id: Int!, $soccer_league_sports_monk_id: Int! ) {
        update_soccer_league(where: {soccer_league_sports_monk_id: {_eq: $soccer_league_sports_monk_id }}, 
          _set: {active: $active, current_season_id: $current_season_id, current_week_id: $current_week_id }) {
            affected_rows
      }
    }
          `,
      variables: {
        active: league_data.active,
        current_season_id: league_data.current_season_id,
        current_week_id: league_data.current_week_id,
        soccer_league_sports_monk_id: league_data.soccer_league_sports_monk_id,
      },
    }),
  })
    .then((res: any) => res.json())
    .then((result: any) => console.log(result));
};

(async () => {
  const soccer_league_data: TLeagueDataUpdate = await getSoccerLeaguesData(8);

  console.log(soccer_league_data);

  updateSoccerLeaguesData(soccer_league_data);
})();
