import { getTeam, getTeamByName, getTeamsBySeason, getCurrentLeaguesByTeam, getLeaguesByTeam } from '../../api/teamsApi.js';
import { getTeamExpected, getTeamsBySeasonExpected, getCurrentLeaguesByTeamExpected, getLeaguesByTeamExpected } from './teamsData.js'


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

test('getTeamsBySeason endpoint', async () => {
    const data = await getTeamsBySeason(17328);
    expect(data.length).toEqual(12);
    expect(data[0]['id']).toEqual(getTeamsBySeasonExpected['id']);
    expect(data[0]['name']).toEqual(getTeamsBySeasonExpected['name']);
    expect(data[0]['country_id']).toEqual(getTeamsBySeasonExpected['country_id']);
    expect(data[0]['founded']).toEqual(getTeamsBySeasonExpected['founded']);
});

test('getCurrentLeaguesByTeam endpoint', async () => {
    const data = await getCurrentLeaguesByTeam(939);
    expect(data.length).toEqual(1);
    expect(data[0]['id']).toEqual(getCurrentLeaguesByTeamExpected['id']);
    expect(data[0]['name']).toEqual(getCurrentLeaguesByTeamExpected['name']);
    expect(data[0]['country_id']).toEqual(getCurrentLeaguesByTeamExpected['country_id']);
    expect(data[0]['type']).toEqual(getCurrentLeaguesByTeamExpected['type']);
    expect(data[0]['league']['data']['id']).toEqual(getCurrentLeaguesByTeamExpected['league']['data']['id']);
    expect(data[0]['league']['data']['type']).toEqual(getCurrentLeaguesByTeamExpected['league']['data']['type']);
});

test('getLeaguesByTeam endpoint', async () => {
    const data = await getLeaguesByTeam(939);
    expect(data.length).toEqual(16);
    expect(data[0]['id']).toEqual(getLeaguesByTeamExpected['id']);
    expect(data[0]['name']).toEqual(getLeaguesByTeamExpected['name']);
    expect(data[0]['country_id']).toEqual(getLeaguesByTeamExpected['country_id']);
    expect(data[0]['type']).toEqual(getLeaguesByTeamExpected['type']);
    expect(data[0]['league']['data']['id']).toEqual(getLeaguesByTeamExpected['league']['data']['id']);
    expect(data[0]['league']['data']['type']).toEqual(getLeaguesByTeamExpected['league']['data']['type']);
});