
const lastUpdateSchema = {
    title: "Data",
    description: "Last update schema",
    type: "object",
    properties: {
        date: {type: "string"},
        timezone_type: {type: "integer"},
        timezone: {type: "string"},
    }
}

const bookmakerOddsDataSchema = {
    title: "Data",
    description: "Bookmaker odds data schema",
    type: "object",
    properties: {
        value: {anyOf: [{type: "number"},{type: "string"}]},
        handicap: {anyOf: [{type: "number"},{type: "string"}, {type: "null"}]},
        total: {type: "string", "nullable": true},
        label: {type: "string", "nullable": true},
        probability: {type: "string"},
        dp3: {type: "string"},
        american: {type: "integer"},
        factional: {type: "string", "nullable": true},
        winning: {type: "boolean", "nullable": true},
        stop: {type: "boolean"},
        bookmaker_event_id: {anyOf: [{type: "number"},{type: "string"}, {type: "null"}]},
        lastUpdate: lastUpdateSchema
    }
}

const singleBookmakerDataSchema = {
    type: "array",
    items: bookmakerOddsDataSchema
}

const bookmakerOddsSchema = {
    title: "Data",
    description: "Bookmaker schema",
    type: "object",
    properties: {
        data: singleBookmakerDataSchema,
    }
}

const singleBookmakerSchema = {
    title: "Data",
    description: "Single bookmaker schema",
    type: "object",
    properties: {
        id: {type: "integer"},
        name: {type: "string"},
        odds: bookmakerOddsSchema
    }
}

const bookmakerDataSchema = {
    type: "array",
    items: singleBookmakerSchema
}

const bookmakerSchema = {
    title: "Data",
    description: "Bookmaker schema",
    type: "object",
    properties: {
        data: bookmakerDataSchema,
    }
}

const oddSchema = {
    title: "Data",
    description: "Data odd schema",
    type: "object",
    properties: {
        id: {type: "integer"},
        name: {type: "string"},
        suspended: {type: "boolean"},
        bookmaker: bookmakerSchema,
    }
}

export const oddsSchema = {
    type: "array",
    items: oddSchema
}
