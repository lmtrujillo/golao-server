import { getLeagues, getLeague, getLeagueByName } from '../../api/leagueApi.js';
import { getLeaguesExpected, getLeagueExpected, getLeagueByNameExpected } from './leagueData'


test('getLeagues endpoint', async () => {
  const data = await getLeagues();
  expect(data).toStrictEqual(getLeaguesExpected);
});

test('getLeague by id endpoint', async () => {
  const data = await getLeague(271);
  expect(data).toStrictEqual(getLeagueExpected);
});

test('getLeague by name endpoint', async () => {
  const data = await getLeagueByName("Premiership");
  expect(data).toStrictEqual(getLeagueByNameExpected);
});