import { getVenue, getVenuesSeason } from '../../api/venuesApi.js';
import { getVenueExpected, getVenuesSeasonExpected } from './venuesData.js'

test('getVenue endpoint', async () => {
  const data = await getVenue(1);
  expect(data).toStrictEqual(getVenueExpected);
});

test('getVenuesSeason endpoint', async () => {
    const data = await getVenuesSeason(17328);
    expect(data.length).toEqual(12);
    expect(data[0]['id']).toEqual(getVenuesSeasonExpected['id']);
    expect(data[0]['name']).toEqual(getVenuesSeasonExpected['name']);
    expect(data[0]['city']).toEqual(getVenuesSeasonExpected['city']);
});