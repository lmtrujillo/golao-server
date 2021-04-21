import fetch from 'node-fetch'
import dotenv from 'dotenv'
dotenv.config()
import { getTeam } from './api/teamsApi.js'
import { getLeague, getLeagues} from './api/leagueApi.js';

// API TEST CALLS:

//getLeagues();
//getLeague(501);
//getMatchesFromNWeekLeague(2, 271);
//getWeeksFromNLeague(271);
//getNWeek(199448);
//getNMatch(16773965);
//getTeam(939);