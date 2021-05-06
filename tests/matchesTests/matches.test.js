import { getMatch, getMatchesTimeframe } from '../../api/matchesApi.js';
import { getMatchExpected, getMatchesTimeframeExpected } from './matchesData.js'


test('getMatch endpoint', async () => {
    const data = await getMatch(16773965);
    expect(data).toStrictEqual(getMatchExpected);
});


test('getMatchesTimeframe endpoint', async () => {
    const data = await getMatchesTimeframe('2020-09-19', '2020-09-21');
    expect(data).toStrictEqual(getMatchesTimeframeExpected);
});