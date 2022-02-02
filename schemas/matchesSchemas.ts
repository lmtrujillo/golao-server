const temperatureSchema = {
  type: "object",
  properties: {
    temp: { type: "number" },
    unit: { type: "string" },
  },
};

const windSchema = {
  type: "object",
  properties: {
    speed: { type: "string" },
    unit: { type: "integer" },
  },
};

const coordinatesSchema = {
  type: "object",
  properties: {
    lat: { type: "number" },
    long: { type: "number" },
  },
};

const weatherReportSchema = {
  type: "object",
  nullable: true,
  properties: {
    code: { type: "string" },
    type: { type: "string" },
    icon: { type: "string" },
    temperature: temperatureSchema,
    temperature_celcius: temperatureSchema,
    clouds: { type: "string" },
    humidity: { type: "string" },
    pressure: { type: "integer" },
    wind: windSchema,
    coordinates: coordinatesSchema,
    updated_at: { type: "string" },
  },
};

const formationsSchema = {
  type: "object",
  properties: {
    localteam_formation: { type: "string", nullable: true },
    visitorteam_formation: { type: "string", nullable: true },
  },
};

const scoresSchema = {
  type: "object",
  properties: {
    localteam_score: { type: "integer" },
    visitorteam_score: { type: "integer" },
    localteam_pen_score: { type: "integer", nullable: true },
    visitorteam_pen_score: { type: "integer", nullable: true },
    ht_score: { type: "string", nullable: true },
    ft_score: { type: "string", nullable: true },
    et_score: { type: "string", nullable: true },
    ps_score: { type: "string", nullable: true },
  },
};

const startingAtSchema = {
  type: "object",
  properties: {
    date_time: { type: "string" },
    date: { type: "string" },
    time: { type: "string" },
    timestamp: { type: "integer" },
    timezone: { type: "string" },
  },
};

const timeSchema = {
  type: "object",
  properties: {
    status: { type: "string" },
    starting_at: startingAtSchema,
    minute: { type: "integer", nullable: true },
    second: { type: ["integer", "string"], nullable: true },
    added_time: { type: "integer", nullable: true },
    extra_minute: { type: "integer", nullable: true },
    injury_time: { type: "integer", nullable: true },
  },
};

const coachesSchema = {
  type: "object",
  properties: {
    localteam_coach_id: { type: "integer", nullable: true },
    visitorteam_coach_id: { type: "integer", nullable: true },
  },
};

const standingsSchema = {
  type: "object",
  properties: {
    localteam_position: { type: "integer", nullable: true },
    visitorteam_position: { type: "integer", nullable: true },
  },
};

const assistantsSchema = {
  type: "object",
  properties: {
    first_assistant_id: { type: "integer", nullable: true },
    second_assistant_id: { type: "integer", nullable: true },
    fourth_official_id: { type: "integer", nullable: true },
  },
};

const colorsTeamSchema = {
  type: "object",
  nullable: true,
  properties: {
    color: { type: "string", nullable: true },
    kit_colors: { type: "string", nullable: true },
  },
};

const colorsSchema = {
  type: "object",
  nullable: true,
  properties: {
    localteam: colorsTeamSchema,
    visitorteam: colorsTeamSchema,
  },
};

export const matchSchema = {
  title: "Data",
  description: "Data match schema",
  type: "object",
  properties: {
    id: { type: "integer" },
    league_id: { type: "integer" },
    season_id: { type: "integer" },
    stage_id: { type: "integer" },
    round_id: { type: "integer" },
    group_id: { type: "integer", nullable: true },
    aggregate_id: { type: "integer", nullable: true },
    venue_id: { type: "integer" },
    referee_id: { type: "integer", nullable: true },
    localteam_id: { type: "integer" },
    visitorteam_id: { type: "integer" },
    winner_team_id: { type: "integer", nullable: true },
    weather_report: weatherReportSchema,
    nullable: true,
    commentaries: { type: "boolean" },
    attendance: { type: "integer", nullable: true },
    pitch: { type: "string", nullable: true },
    details: { type: "string", nullable: true },
    neutral_venue: { type: "boolean" },
    winning_odds_calculated: { type: "boolean" },
    formations: formationsSchema,
    scores: scoresSchema,
    time: timeSchema,
    coaches: coachesSchema,
    standings: standingsSchema,
    assistants: assistantsSchema,
    leg: { type: "string" },
    colors: colorsSchema,
    deleted: { type: "boolean" },
    is_placeholder: { type: "boolean" },
  },
};

export const matchesSchema: any = {
  type: "array",
  items: matchSchema,
};
