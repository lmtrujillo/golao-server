import { getMatch, getMatchesTimeframe, getMatchesFromNWeekLeague, getMatchesTimeframeTeam } from '../../api/matchesApi.js';
import { getMatchExpected, getMatchesTimeframeExpected, getMatchesFromNWeekLeagueExpected, getMatchesTimeframeTeamExpected } from './matchesData.js'


test('getMatch endpoint', async () => {
    const data = await getMatch(16773965);
    expect(data).toStrictEqual(getMatchExpected);
});


test('getMatchesTimeframe endpoint', async () => {
    const data = await getMatchesTimeframe('2020-09-19', '2020-09-21');
    expect(data).toStrictEqual(getMatchesTimeframeExpected);
});

test('getMatchesFromNWeekLeague endpoint', async () => {
    const data = await getMatchesFromNWeekLeague(5, 271);
    expect(data[0]).toStrictEqual(getMatchesFromNWeekLeagueExpected);
    expect(data.length).toEqual(11);
});

test('getMatchesTimeframeTeam endpoint', async () => {
    const data = await getMatchesTimeframeTeam('2020-09-19', '2020-09-21', 939);
    expect(data).toStrictEqual(getMatchesTimeframeTeamExpected);
    expect(data.length).toEqual(1);
});