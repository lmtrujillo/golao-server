import { getLeagues, getLeague, getLeagueByName } from '../../api/leaguesApi.js';
import { getLeaguesExpected, getLeagueExpected, getLeagueByNameExpected } from './leaguesData.js'


test('getLeagues endpoint', async () => {
  const data = await getLeagues();
  expect(data[0]['id']).toEqual(getLeaguesExpected[0]['id']);
  expect(data[1]['id']).toEqual(getLeaguesExpected[1]['id']);
  expect(data[2]['id']).toEqual(getLeaguesExpected[2]['id']);
  expect(data[0]['country_id']).toEqual(getLeaguesExpected[0]['country_id']);
  expect(data[1]['country_id']).toEqual(getLeaguesExpected[1]['country_id']);
  expect(data[2]['country_id']).toEqual(getLeaguesExpected[2]['country_id']);
});

test('getLeague by id endpoint', async () => {
  const data = await getLeague(271);
  expect(data['id']).toEqual(getLeagueExpected['id']);
  expect(data['name']).toEqual(getLeagueExpected['name']);
  expect(data['type']).toEqual(getLeagueExpected['type']);
});

test('getLeague by name endpoint', async () => {
  const data = await getLeagueByName("Premiership");
  expect(data[0]['id']).toEqual(getLeagueByNameExpected[0]['id']);
  expect(data[1]['id']).toEqual(getLeagueByNameExpected[1]['id']);
  expect(data[0]['is_cup']).toEqual(getLeagueByNameExpected[0]['is_cup']);
  expect(data[1]['is_cup']).toEqual(getLeagueByNameExpected[1]['is_cup']);
});