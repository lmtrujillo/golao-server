import { getMatchesFromNWeekLeague } from "../functions/matchesApi";
import { TMatchDataRaw, TMatchData } from "./types";
import dotenv from "dotenv";
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

const fromSportsMonkToGolaoDatabaseTeamId = async (
  team_id_sports_monk: number
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
        team(where: {team_id_sports_monk: {_eq: $week_id_sports_monk}}) {
          team_id
        }
      }
        `,
      variables: {
        week_id_sports_monk: team_id_sports_monk,
      },
    }),
  })
    .then((res: any) => res.json())
    .then((result: any) => {
      return result.data?.team[0]!.team_id!;
    });
};

const fromSportsMonkToGolaoDatabaseSoccerLeagueId = async (
  soccer_league_id_sports_monk: number
): Promise<number> => {
  return fetch("https://golao-api.hasura.app/v1/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET,
    },
    body: JSON.stringify({
      query: `
      query getSoccerLeagueId ($soccer_league_id_sports_monk: Int!) {
        soccer_league(where: {soccer_league_sports_monk_id: {_eq: $soccer_league_id_sports_monk}}) {
          soccer_league_id
        }
      }
        `,
      variables: {
        soccer_league_id_sports_monk: soccer_league_id_sports_monk,
      },
    }),
  })
    .then((res: any) => res.json())
    .then((result: any) => {
      return result.data?.soccer_league[0]!.soccer_league_id!;
    });
};

export const getMatchesData = async (
  n_week: number,
  league_id: number
): Promise<TMatchData[]> => {
  const matches_raw_data = await getMatchesFromNWeekLeague(n_week, league_id);

  const matches_data: TMatchData[] = await Promise.all(
    matches_raw_data.map(async (match: TMatchDataRaw): Promise<TMatchData> => {
      return {
        week_id: await fromSportsMonkToGolaoDatabaseWeekId(match.round_id),
        time_status: match.time.status,
        starting_date_time:
          match.time.starting_at.date! + "T" + match.time.starting_at.time!,
        minute: match.time.minute || 0,
        second: match.time.second || 0,
        home_team_id: await fromSportsMonkToGolaoDatabaseTeamId(
          match.localteam_id
        ),
        away_team_id: await fromSportsMonkToGolaoDatabaseTeamId(
          match.visitorteam_id
        ),
        winner_team_id: await fromSportsMonkToGolaoDatabaseTeamId(
          match.winner_team_id
        ),
        soccer_league_id: await fromSportsMonkToGolaoDatabaseSoccerLeagueId(
          match.league_id
        ),
        home_team_score: match.scores.localteam_score,
        away_team_score: match.scores.visitorteam_score,
        match_id_sports_monk: match.id,
      };
    })
  );

  return matches_data;
};

export const storeTeamsData = async (matches_data: any): Promise<void> => {
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
  const matches_data: TMatchData[] = await getMatchesData(38, 8);
  storeTeamsData(matches_data);
})();
