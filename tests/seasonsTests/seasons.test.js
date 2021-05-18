import { getSeasons, getSeason } from '../../api/seasonsApi.js';
import { getSeasonsExpected, getSeasonExpected } from './seasonsData.js'


test('getSeasons endpoint', async () => {
    const data = await getSeasons();
    expect(data[0]).toStrictEqual(getSeasonsExpected);
    expect(data.length).toEqual(41);
});


test('getSeason endpoint', async () => {
    const data = await getSeason(15949);
    expect(data).toStrictEqual(getSeasonExpected);
});