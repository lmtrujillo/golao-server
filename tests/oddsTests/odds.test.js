import { getOddsFixtureBookmaker, getOddsFixtureMarket, getOddsFixture } from '../../api/oddsApi.js';
import { getOddsFixtureBookmakerExpected, getOddsFixtureMarketExpected, getOddsFixtureExpected } from './oddsData.js'


test('getOddsFixturesBookmaker endpoint', async () => {
    const data = await getOddsFixtureBookmaker(16773965, 1);
    expect(data[0]).toStrictEqual(getOddsFixtureBookmakerExpected);
    expect(data.length).toEqual(32);
});


test('getOddsFixtureMarket endpoint', async () => {
    const data = await getOddsFixtureMarket(16773965, 1);
    expect(data).toStrictEqual(getOddsFixtureMarketExpected);
});

test('getOddsFixture endpoint', async () => {
    const data = await getOddsFixture(16773965);
    expect(data[0]).toStrictEqual(getOddsFixtureExpected);
    expect(data.length).toEqual(87);
});