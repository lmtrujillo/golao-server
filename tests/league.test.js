import { getLeagues } from '../api/leagueApi.js';

const getLeaguesExpected = [
    {
      id: 271,
      active: true,
      type: 'domestic',
      legacy_id: 43,
      country_id: 320,
      logo_path: 'https://cdn.sportmonks.com/images/soccer/leagues/271.png',
      name: 'Superliga',
      is_cup: false,
      current_season_id: 17328,
      current_round_id: 240937,
      current_stage_id: 77448541,
      live_standings: true,
      coverage: {
        predictions: true,
        topscorer_goals: true,
        topscorer_assists: true,
        topscorer_cards: true
      }
    },
    {
      id: 501,
      active: true,
      type: 'domestic',
      legacy_id: 66,
      country_id: 1161,
      logo_path: 'https://cdn.sportmonks.com/images/soccer/leagues/501.png',
      name: 'Premiership',
      is_cup: false,
      current_season_id: 17141,
      current_round_id: 240675,
      current_stage_id: 77447500,
      live_standings: true,
      coverage: {
        predictions: true,
        topscorer_goals: true,
        topscorer_assists: true,
        topscorer_cards: true
      }
    },
    {
      id: 513,
      active: true,
      type: 'domestic',
      legacy_id: null,
      country_id: 1161,
      logo_path: 'https://cdn.sportmonks.com/images/soccer/leagues/1/513.png',
      name: 'Premiership Play-Offs',
      is_cup: false,
      current_season_id: null,
      current_round_id: null,
      current_stage_id: null,
      live_standings: false,
      coverage: {
        predictions: true,
        topscorer_goals: true,
        topscorer_assists: true,
        topscorer_cards: true
      }
    },
    {
      id: 1659,
      active: true,
      type: 'domestic',
      legacy_id: null,
      country_id: 320,
      logo_path: 'https://cdn.sportmonks.com/images//soccer/leagues/27/1659.png',
      name: 'Superliga Play-offs',
      is_cup: false,
      current_season_id: 18101,
      current_round_id: null,
      current_stage_id: null,
      live_standings: false,
      coverage: {
        predictions: true,
        topscorer_goals: true,
        topscorer_assists: true,
        topscorer_cards: true
      }
    }
]

test('getLeagues endpoint', async () => {
  const data = await getLeagues();
  expect(data).toStrictEqual(getLeaguesExpected);
});