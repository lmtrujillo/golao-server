import { getCurrentLeaguesByTeam } from "../../api/teamsApi"

export const getTeamExpected = {
    id: 939,
    legacy_id: 513,
    name: 'Midtjylland',
    short_code: 'FCM',
    twitter: null,
    country_id: 320,
    national_team: false,
    founded: 1999,
    logo_path: 'https://cdn.sportmonks.com/images//soccer/teams/11/939.png',
    venue_id: 342,
    current_season_id: 17328,
    is_placeholder: false
}

export const getTeamsBySeasonExpected = {
    id: 85,
    legacy_id: 146,
    name: 'København',
    short_code: 'COP',
    twitter: null,
    country_id: 320,
    national_team: false,
    founded: 1992,
    logo_path: 'https://cdn.sportmonks.com/images//soccer/teams/21/85.png',
    venue_id: 5655,
    current_season_id: 17328,
    is_placeholder: false
}

export const getCurrentLeaguesByTeamExpected = {
    id: 17328,
    name: "2020/2021",
    league_id: 271,
    is_current_season: true,
    current_round_id: 240941,
    current_stage_id: 77448541,
    league: {
      data: {
        id: 271,
        active: true,
        type: "domestic",
        legacy_id: 43,
        country_id: 320,
        logo_path: "https://cdn.sportmonks.com/images/soccer/leagues/271.png",
        name: "Superliga",
        is_cup: false,
        current_season_id: 17328,
        current_round_id: 240941,
        current_stage_id: 77448541,
        live_standings: true,
        coverage: {
          predictions: true,
          topscorer_goals: true,
          topscorer_assists: true,
          topscorer_cards: true
        }
      }
    }
}

export const getLeaguesByTeamExpected = {
    id: 1273,
    name: "2005/2006",
    league_id: 271,
    is_current_season: false,
    current_round_id: null,
    current_stage_id: null,
    league: {
      data: {
        id: 271,
        active: true,
        type: "domestic",
        legacy_id: 43,
        country_id: 320,
        logo_path: "https://cdn.sportmonks.com/images/soccer/leagues/271.png",
        name: "Superliga",
        is_cup: false,
        current_season_id: 17328,
        current_round_id: 240941,
        current_stage_id: 77448541,
        live_standings: true,
        coverage: {
          predictions: true,
          topscorer_goals: true,
          topscorer_assists: true,
          topscorer_cards: true
        }
      }
    }
  }