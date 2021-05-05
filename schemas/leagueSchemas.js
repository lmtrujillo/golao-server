
const coverageSchema = {
  type: "object",
  properties: {
    predictions: {type: "boolean"},
    topscorer_goals: {type: "boolean"},
    topscorer_assists: {type: "boolean"},
    topscorer_cards: {type: "boolean"}
  },
}

export const leaguesSchema = {
    type: "array",
    items: leagueSchema
}


export const leagueSchema = {
    title: "Data",
    description: "Data array schema",
    type: "object",
    properties: {
      id: {type: "integer"},
      active: {type: "boolean"},
      type: {type: "string"},
      legacy_id: {type: "integer", "nullable": true},
      country_id: {type: "integer"},
      logo_path: {type: "string"},
      name: {type: "string"},
      is_cup: {type: "boolean"},
      current_season_id: {type: "integer", "nullable": true},
      current_round_id: {type: "integer", "nullable": true},
      current_stage_id: {type: "integer", "nullable": true},
      live_standings: {type: "boolean"},
      coverage: coverageSchema
    }
}

