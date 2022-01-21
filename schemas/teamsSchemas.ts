export const teamSchema: any = {
    title: "Data",
    description: "Data season schema",
    type: "object",
    properties: {
        id: {type: "integer"},
        legacy: {type: "integer"},
        name: {type: "string"},
        short_code: {type: "string"},
        twitter: {type: "string", "nullable": true},
        country_id: {type: "integer"},
        national_team: {type: "boolean"},
        founded: {type: "integer"},
        logo_path: {type: "string"},
        venue_id: {type: "integer"},
        current_season_id: {type: "integer"}
    }
}

export const teamBySeasonSchema: any = {
    title: "Data",
    description: "Data season schema",
    type: "object",
    properties: {
        id: {type: "integer"},
        legacy: {type: "integer"},
        name: {type: "string"},
        short_code: {type: "string", "nullable": true},
        twitter: {type: "string", "nullable": true},
        country_id: {type: "integer"},
        national_team: {type: "boolean"},
        founded: {type: "integer"},
        logo_path: {type: "string"},
        venue_id: {type: "integer"},
        current_season_id: {type: "integer"},
        is_placeholder: {type: "boolean"},
    }
}

export const teamsSchema: any = {
    type: "array",
    items: teamSchema
}

export const teamsBySeasonSchema: any = {
    type: "array",
    items: teamBySeasonSchema
}

export const coverageSchema: any = {
    title: "Data",
    description: "Data leagues by team schema",
    type: "object",
    properties: {
        predictions: {type: "boolean"},
        topscorer_goals: {type: "boolean"},
        topscorer_assists: {type: "boolean"},
        topscorer_cards: {type: "boolean"},
    }
}

export const leagueByTeamDataSchema: any = {
    title: "Data",
    description: "Data leagues by team schema",
    type: "object",
    properties: {
        id: {type: "integer"},
        active: {type: "boolean"},
        type: {type: "string"},
        legacy: {type: "integer"},
        country_id: {type: "integer"},
        logo_path: {type: "string"},
        name: {type: "string"},
        is_cup: {type: "boolean"},
        current_season_id: {type: "integer"},
        current_round_id: {type: "integer"},
        current_stage_id: {type: "integer"},
        live_standings: {type: "boolean"},
        coverage: coverageSchema,
    }
}

export const leagueByTeamSchema: any = {
    title: "Data",
    description: "Data leagues by team schema",
    type: "object",
    properties: {
        data: leagueByTeamDataSchema,
    }
}

export const leaguesByTeamSchema: any = {
    title: "Data",
    description: "Data leagues by team schema",
    type: "object",
    properties: {
        id: {type: "integer"},
        name: {type: "string"},
        league_id: {type: "integer"},
        is_current_season: {type: "boolean"},
        current_round_id: {type: "integer", "nullable": true},
        current_stage_id: {type: "integer", "nullable": true},
        league: leagueByTeamSchema
    }
}

export const leaguesByTeamDataSchema: any = {
    type: "array",
    items: leaguesByTeamSchema
}