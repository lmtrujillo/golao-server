export const seasonSchema: any = {
  title: "Data",
  description: "Data season schema",
  type: "object",
  properties: {
    id: { type: "integer" },
    name: { type: "string" },
    league_id: { type: "integer" },
    is_current_season: { type: "boolean" },
    current_round_id: { type: "integer", nullable: true },
    current_stage_id: { type: "integer", nullable: true },
  },
};

export const seasonsSchema: any = {
  type: "array",
  items: seasonSchema,
};
