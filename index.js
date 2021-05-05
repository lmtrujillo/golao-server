import { getTeam } from './api/teamsApi.js'
import { getLeague, getLeagues} from './api/leagueApi.js';
import { getWeeksFromNLeague } from './api/weeksApi.js';
import { getMatch, getMatchesFromNWeekLeague } from './api/matchesApi.js';


// API TEST CALLS:

//getLeagues();
//getLeague(501);
//getMatchesFromNWeekLeague(2, 271);
//getWeeksFromNLeague(271);
//getNWeek(199448);
//getMatch(16773965);
//getTeam(939);

async function testing () {
//  console.log(await getLeagues());
//  console.log(await getTeam(939));
//  console.log(await getMatchesFromNWeekLeague(2, 271));
//  console.log(await getWeeksFromNLeague(271));
    console.log(await getMatch(16773965));
}

testing();