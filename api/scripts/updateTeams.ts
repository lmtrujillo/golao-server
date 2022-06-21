import { getTeamsByCountry } from "../functions/teamsApi";
import { getVenue } from "../functions/venuesApi";
import { TTeamData, TTeamDataRaw } from "./types";
import dotenv from "dotenv";
dotenv.config();

const fetch = require("node-fetch");

export const getTeamsDataByCountryId = async (
  country_id: number
): Promise<TTeamData[]> => {
  const teams_raw_data = await getTeamsByCountry(country_id);

  const teams_data: TTeamData[] = await Promise.all(
    teams_raw_data.map(async (team: TTeamDataRaw): Promise<TTeamData> => {
      const venue = await getVenue(team.venue_id!);

      return {
        team_name: team.name,
        logo_url: team.logo_path,
        venue: venue!.name || "",
        venue_url: venue!.image_path || "",
        team_id_sports_monk: team.id,
      };
    })
  );

  return teams_data;
};

export const storeTeamsData = async (
  teams_data: TTeamData[]
): Promise<void> => {
  fetch("https://golao-api.hasura.app/v1/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET,
    },
    body: JSON.stringify({
      query: `
      mutation updateTeams($objects: [team_insert_input!]!) {
        insert_team(on_conflict: {constraint: team_team_id_sports_monk_key, update_columns: [team_name, venue, venue_url, logo_url]}, objects: $objects) {
          affected_rows
        }
      }
        `,
      variables: {
        objects: teams_data,
      },
    }),
  })
    .then((res: any) => res.json())
    .then((result: any) => console.log(result));
};

(async () => {
  const teams_data: TTeamData[] = await getTeamsDataByCountryId(462);

  storeTeamsData(teams_data);
})();
