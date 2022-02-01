export const weekSchema = {
    title: "Data",
    description: "Data week schema",
    type: "object",
    properties: {
        id: {type: "integer"},
        name: {type: "integer"},
        league_id: {type: "integer"},
        season_id: {type: "integer"},
        stage_id: {type: "integer"},
        start: {type: "string"},
        end: {type: "string"},
    }
}

export const weeksSchema = {
    type: "array",
    items: weekSchema
}
