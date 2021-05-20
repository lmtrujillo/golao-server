import { getWeek, getWeeksNSeason, getWeeksFromNLeague } from '../../api/weeksApi.js';
import { getWeekExpected, getWeeksFromNLeagueExpected } from './weeksData.js'

test('getWeek endpoint', async () => {
  const data = await getWeek(194968);
  expect(data).toStrictEqual(getWeekExpected);
});

test('getWeeksNSeason endpoint', async () => {
    const data = await getWeeksNSeason(17141);
    expect(data.length).toEqual(38);
    expect(data[0]).toStrictEqual(getWeekExpected);
});

test('getWeeksFromNLeague endpoint', async () => {
    const data = await getWeeksFromNLeague(271);
    expect(data.length).toEqual(45);
    expect(data[0]).toStrictEqual(getWeeksFromNLeagueExpected);
});