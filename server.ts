import express from "express";
import cors from "cors";
import { getMatchesData, storeTeamsData } from "./api/scripts/updateMatches";
import {
  TLeagueData,
  TLeagueDataUpdate,
  TLeagueWithWeekObjectData,
  TMatchData,
  TTeamData,
  TWeekData,
} from "./api/scripts/types";
import {
  getSoccerLeaguesData,
  storeNewSoccerLeaguesData,
} from "./api/scripts/newSoccerLeague";
import { updateSoccerLeaguesData } from "./api/scripts/updateSoccerLeague";
import { getTeamsDataByCountryId } from "./api/scripts/updateTeams";
import {
  fromSportsMonkToGolaoDatabaseSoccerLeagueId,
  getWeeksData,
  storeWeeksData,
} from "./api/scripts/updateWeeks";
import {
  getSoccerLeaguesHasura,
  updateWinnersAndLosers,
} from "./api/scripts/updateWinnersAndLosers";

const app = express();
const port = 3001;

// middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// api endpoints
app.get("/api", (req, res) => {});

/* UPDATE MATCHES */
app.get("/updateMatches", async (req, res) => {
  const matches_data: TMatchData[] = await getMatchesData(38, 8);
  storeTeamsData(matches_data);
  res.json({ message: `Update matches!` });
});

/* NEW SOCCER LEAGUE */
app.get("/newSoccerLeague", async (req, res) => {
  const soccer_league_data: TLeagueData = await getSoccerLeaguesData(564);
  storeNewSoccerLeaguesData(soccer_league_data);
  res.json({ message: `New soccer league!` });
});

/* UPDATE SOCCER LEAGUE */
app.get("/updateSoccerLeague", async (req, res) => {
  const soccer_league_data: TLeagueDataUpdate = await getSoccerLeaguesData(8);
  updateSoccerLeaguesData(soccer_league_data);
  res.json({ message: `Update soccer league!` });
});

/* UPDATE TEAMS */
app.get("/updateTeams", async (req, res) => {
  const teams_data: TTeamData[] = await getTeamsDataByCountryId(462);
  storeTeamsData(teams_data);
  res.json({ message: `Update matches!` });
});

/* UPDATE WEEKS */
app.get("/updateWeeks", async (req, res) => {
  const weeks_data: TWeekData[] = await getWeeksData(
    8,
    await fromSportsMonkToGolaoDatabaseSoccerLeagueId(8)
  );

  storeWeeksData(weeks_data);
  res.json({ message: `Update weeks!` });
});

/* UPDATE WINNERS AND LOSERS */
app.get("/updateWinnersAndLosers", async (req, res) => {
  const soccer_leagues: TLeagueWithWeekObjectData[] =
    await getSoccerLeaguesHasura();
  updateWinnersAndLosers(soccer_leagues);
  res.json({ message: `Update winners and losers!` });
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
