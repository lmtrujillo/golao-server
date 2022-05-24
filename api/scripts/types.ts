export type TTeamData = {
  logo_url: string;
  team_name: string;
  venue: string;
  venue_url: string;
  team_id_sports_monk: number;
};

export type TTeamDataRaw = {
  id: number;
  legacy_id: number;
  name: string;
  short_code: string;
  twitter: string;
  country_id: number;
  national_team: boolean;
  founded: number;
  logo_path: string;
  venue_id: number;
  current_season_id: number;
  is_placeholder: boolean;
};

export type TMatchData = {
  week_id: number;
  time_status: string;
  starting_date_time: string;
  minute: number;
  second: number;
  home_team_id: number;
  away_team_id: number;
  winner_team_id: number;
  soccer_league_id: number;
  home_team_score: number;
  away_team_score: number;
  match_id_sports_monk: number;
};

export type TMatchDataRaw = {
  id: number;
  league_id: number;
  season_id: number;
  stage_id: number;
  round_id: number;
  group_id: number;
  aggregate_id: number;
  venue_id: number;
  referee_id: number;
  localteam_id: number;
  visitorteam_id: number;
  winner_team_id: number;
  weather_report: TWeather;
  commentaries: boolean;
  attendance: number;
  pitch: string;
  details: string;
  neutral_venue: boolean;
  winning_odds_calculated: boolean;
  formations: TFormations;
  scores: TScores;
  time: TTime;
  coaches: TCoaches;
  standings: TStandings;
  assistants: TAssistants;
  leg: string;
  colors: TColors;
  deleted: boolean;
  is_placeholder: boolean;
};

type TWeather = {
  code: string;
  type: string;
  icon: string;
  temperature: temperatureSchema;
  temperature_celcius: temperatureSchema;
  clouds: string;
  humidity: string;
  pressure: number;
  wind: windSchema;
  coordinates: coordinatesSchema;
  updated_at: string;
};

type TFormations = {
  localteam_formation: string;
  visitorteam_formation: string;
};

type TScores = {
  localteam_score: number;
  visitorteam_score: number;
  localteam_pen_score: number;
  visitorteam_pen_score: number;
  ht_score: string;
  ft_score: string;
  et_score: string;
  ps_score: string;
};

type TTime = {
  status: string;
  starting_at: startingAtSchema;
  minute: number;
  second: number;
  added_time: number;
  extra_minute: number;
  injury_time: number;
};

type TCoaches = {
  localteam_coach_id: number;
  visitorteam_coach_id: number;
};

type TStandings = {
  localteam_position: number;
  visitorteam_position: number;
};

type TAssistants = {
  first_assistant_id: number;
  second_assistant_id: number;
  fourth_official_id: number;
};

type TColors = { localteam: TColorsTeam; visitorteam: TColorsTeam };

type TColorsTeam = {
  color: string;
  kit_colors: string;
};

type startingAtSchema = {
  date_time: string;
  date: string;
  time: string;
  timestamp: number;
  timezone: string;
};

type temperatureSchema = {
  temp: number;
  unit: string;
};

type windSchema = {
  speed: string;
  unit: number;
};

type coordinatesSchema = {
  lat: number;
  long: number;
};
export type TWeekData = {
  soccer_league_id: number;
  week_number: number;
  week_start_timestamp: string;
  week_end_timestamp: string;
  week_id_sports_monk: number;
};

export type TWeekDataRaw = {
  id: number;
  name: number;
  league_id: number;
  season_id: number;
  stage_id: number;
  start: string;
  end: string;
};

export type TLeagueData = {
  active: boolean;
  current_season_id: string;
  logo_url: string;
  total_number_of_weeks: number;
  current_week_id: number | null;
  name: string;
  soccer_league_sports_monk_id: number;
};

export type TLeagueDataUpdate = {
  active: boolean;
  current_season_id: string;
  current_week_id: number | null;
  soccer_league_sports_monk_id: number;
};

export type TLeagueWithWeekObjectData = {
  active: boolean;
  current_season_id: string;
  logo_url: string;
  total_number_of_weeks: number;
  current_week_id: number | null;
  name: string;
  soccer_league_sports_monk_id: number;
  current_week: TWeekData | null;
  soccer_league_id: number;
};

export type TLeagueDataRaw = {
  id: number;
  active: boolean;
  type: string;
  legacy_id: number;
  country_id: number;
  logo_path: string;
  name: string;
  is_cup: boolean;
  current_season_id: number;
  current_round_id: number;
  current_stage_id: number;
  live_standings: boolean;
  coverage: TCoverage;
};

type TCoverage = {
  predictions: boolean;
  topscorer_goals: boolean;
  topscorer_assists: boolean;
  topscorer_cards: boolean;
};

export type TLastManLeagueData = {
  active: boolean;
  award: number | null;
  description: string | null;
  entrance_fee: string | null;
  is_public: boolean;
  last_week: number;
  lives_allowed: number;
  lm_league_id: number;
  logo_url: string;
  name: string;
  number_of_participants: number;
  number_of_weeks: number;
  revives_allowed: number;
  share_url: string;
  soccer_league_id: number;
  start_week: number;
};

export type TPickData = {
  lm_league_id: number;
  pick_id: number;
  team_id: number;
  user_id: number;
  week_id: number;
  won_pick: boolean | null;
};

export type TMatchWinnerData = {
  winner_team_id: number | null;
};

export type TLivesData = {
  lives: number | null;
};

type TUserId = {
  user_id: number;
};
export type TLastManLeagueUsersPicks = {
  users: Array<TUserId>;
  picks: Array<TUserId>;
  lm_league_id: number;
};
