import { TWeekData, TWeekDataRaw } from "./types";
import dotenv from "dotenv";
import { getWeeksFromNLeague } from "../functions/weeksApi";
dotenv.config();

const fetch = require("node-fetch");

const getWeeksData = async (league_id: number): Promise<TWeekData[]> => {
  const weeks_raw_data = await getWeeksFromNLeague(league_id);

  const weeks_data: TWeekData[] = await Promise.all(
    weeks_raw_data.map(async (week: TWeekDataRaw): Promise<TWeekData> => {
      return {
        soccer_league_id: week.league_id,
        week_number: week.name,
        week_start_timestamp: week.start! + "T00:00:00",
        week_end_timestamp: week.end! + "T23:59:59",
        week_id_sports_monk: week.id,
      };
    })
  );

  return weeks_data;
};

const storeWeeksData = async (weeks_data: TWeekData[]): Promise<void> => {
  fetch("https://golao-api.hasura.app/v1/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET,
    },
    body: JSON.stringify({
      query: `
      mutation updateWeeks($objects: [week_insert_input!]!) {
        insert_week(on_conflict: {constraint: week_week_id_sports_monk_key, update_columns: 
            [
                soccer_league_id,
                week_number,
                week_start_timestamp,
                week_end_timestamp,
                week_id_sports_monk,
            ]}, objects: $objects) {
                affected_rows
            }
        }
        `,
      variables: {
        objects: weeks_data,
      },
    }),
  })
    .then((res: any) => res.json())
    .then((result: any) => console.log(result));
};

(async () => {
  const weeks_data: TWeekData[] = await getWeeksData(271);

  storeWeeksData(weeks_data);
})();
