import { getTeam, getTeamByName, getTeamsBySeason, getCurrentLeaguesByTeam, getLeaguesByTeam } from '../../api/teamsApi.js';
import { getTeamExpected } from './teamsData.js'


test('getTeam endpoint', async () => {
  const data = await getTeam(939);
  expect(data['id']).toEqual(getTeamExpected['id']);
  expect(data['name']).toEqual(getTeamExpected['name']);
  expect(data['country_id']).toEqual(getTeamExpected['country_id']);
  expect(data['founded']).toEqual(getTeamExpected['founded']);
});

test('getTeamByName endpoint', async () => {
    const data = await getTeamByName("Midtjylland");
    expect(data[0]['id']).toEqual(getTeamExpected['id']);
    expect(data[0]['name']).toEqual(getTeamExpected['name']);
    expect(data[0]['country_id']).toEqual(getTeamExpected['country_id']);
    expect(data[0]['founded']).toEqual(getTeamExpected['founded']);
  });