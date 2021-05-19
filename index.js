import { getTeam, getTeamByName, getTeamsBySeason, getCurrentLeaguesByTeam, getLeaguesByTeam } from './api/teamsApi.js'
import { getLeague, getLeagues} from './api/leaguesApi.js';
import { getWeeksFromNLeague } from './api/weeksApi.js';
import { getMatch, getMatchesFromNWeekLeague, getMatchesTimeframe, getMatchesTimeframeTeam } from './api/matchesApi.js';
import { getOddsFixtureBookmaker, getOddsFixtureMarket, getOddsFixture, getInplayOddsFixture } from './api/oddsApi.js'
import { getSeason, getSeasons } from './api/seasonsApi.js'

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
//  console.log(await getTeamByName("Midtjylland"));
//  console.log(await getTeamsBySeason(17328));
//  console.log(await getMatchesFromNWeekLeague(2, 271));
//  console.log(await getWeeksFromNLeague(271));
//  console.log(await getMatch(16773965));
//    console.log(await getMatchesTimeframe('2020-09-19', '2020-09-21'));
//    console.log(await getMatchesFromNWeekLeague(2, 271));
// console.log(await getMatchesTimeframeTeam('2020-09-19', '2020-09-21', 939))
// console.log(await getOddsFixtureBookmaker(16773965, 1))
// console.log(await getOddsFixtureMarket(16773965, 1))
// console.log(await getOddsFixture(16773965))
//   console.log(await getInplayOddsFixture(11865351))
//   console.log(await getSeasons())
//   console.log(await getSeason(15949))
//    const data = await getCurrentLeaguesByTeam(939);
//    console.log(JSON.stringify(data));
    const data = await getLeaguesByTeam(939);
    console.log(JSON.stringify(data));

}

testing();