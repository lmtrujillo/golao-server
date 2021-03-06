import {
  TLeagueWithWeekObjectData,
  TPickData,
  TMatchWinnerData,
  TLastManLeagueUsersPicks,
} from "./types";
import dotenv from "dotenv";
dotenv.config();

const fetch = require("node-fetch");

export const getSoccerLeaguesHasura = async (): Promise<
  TLeagueWithWeekObjectData[]
> => {
  return fetch("https://golao-api.hasura.app/v1/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET,
    },
    body: JSON.stringify({
      query: `
      query MyQuery {
        soccer_league {
          active
          current_season_id
          current_week_id
          logo_url
          name
          soccer_league_id
          soccer_league_sports_monk_id
          total_number_of_weeks
          current_week {
            week_number
            soccer_league_id
            week_end_timestamp
            week_id_sports_monk
            week_start_timestamp
          }
        }
      }              
          `,
    }),
  })
    .then((res: any) => res.json())
    .then((result: any) => {
      return result.data?.soccer_league;
    });
};

const getPicksHasura = async (
  soccer_league_id: number,
  week_id: number
): Promise<TPickData[]> => {
  return fetch("https://golao-api.hasura.app/v1/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET,
    },
    body: JSON.stringify({
      query: `
      query MyQuery ($soccer_league_id: Int!, $week_id: Int!) {
        pick(where: {week_id: {_eq: $week_id}, last_man_league: {soccer_league_id: {_eq: $soccer_league_id}}}) {
          lm_league_id
          pick_id
          team_id
          user_id
          week_id
          won_pick
        }
      }            
          `,
      variables: {
        soccer_league_id: soccer_league_id,
        week_id: week_id,
      },
    }),
  })
    .then((res: any) => res.json())
    .then((result: any) => {
      return result.data?.pick;
    });
};

const getMatchHasura = async (
  time_status: string,
  week_id: number,
  team_id: number
): Promise<TMatchWinnerData[]> => {
  return fetch("https://golao-api.hasura.app/v1/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET,
    },
    body: JSON.stringify({
      query: `
      query MyQuery ($time_status: String!,
        $week_id: Int!,
        $team_id: Int!) {
        match(where: {time_status: {_eq: $time_status}, week_id: {_eq: $week_id}, _and: {_or: [{home_team_id: { _eq: $team_id }}, {away_team_id: { _eq: $team_id }}]}}) {
          winner_team_id
        }
      }           
          `,
      variables: {
        time_status: time_status,
        week_id: week_id,
        team_id: team_id,
      },
    }),
  })
    .then((res: any) => res.json())
    .then((result: any) => {
      return result.data?.match;
    });
};

const wonPick = async (pick_id: number): Promise<void> => {
  fetch("https://golao-api.hasura.app/v1/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET,
    },
    body: JSON.stringify({
      query: `
      mutation MyMutation($pick_id: Int!) {
        update_pick(where: {pick_id: {_eq: $pick_id}}, _set: {won_pick: true}) {
          affected_rows
        }
      }         
        `,
      variables: {
        pick_id: pick_id,
      },
    }),
  })
    .then((res: any) => res.json())
    .then((result: any) => console.log(result));
};

const lostPick = async (
  pick_id: number,
  lm_league_id: number,
  user_id: number
): Promise<void> => {
  fetch("https://golao-api.hasura.app/v1/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET,
    },
    body: JSON.stringify({
      query: `
      mutation MyMutation($pick_id: Int!, $lm_league_id: Int!, $user_id: Int!) {
        update_pick(where: {pick_id: {_eq: $pick_id}}, _set: {won_pick: false}) {
          affected_rows
        }
        update_user_lm_league(where: {user_id: {_eq: $user_id}, lm_league_id: {_eq: $lm_league_id}}, _inc: {lives: -1}) {
          affected_rows
        }
      }       
        `,
      variables: {
        pick_id: pick_id,
        lm_league_id: lm_league_id,
        user_id: user_id,
      },
    }),
  })
    .then((res: any) => res.json())
    .then((result: any) => console.log(result));

  fetch("https://golao-api.hasura.app/v1/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET,
    },
    body: JSON.stringify({
      query: `
      mutation MyMutation2($lm_league_id: Int!, $user_id: Int!) {
        update_user_lm_league(where: {user_id: {_eq: $user_id}, lm_league_id: {_eq: $lm_league_id}, lives: {_eq: 0}}, _set: {is_active: false}) {
          affected_rows
        }
      }
          
        `,
      variables: {
        lm_league_id: lm_league_id,
        user_id: user_id,
      },
    }),
  })
    .then((res: any) => res.json())
    .then((result: any) => console.log(result));
};

const loseLivePickNotMade = async (
  lm_league_id: number,
  user_id: number,
  week_id: number
): Promise<void> => {
  fetch("https://golao-api.hasura.app/v1/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET,
    },
    body: JSON.stringify({
      query: `
      mutation MyMutation($lm_league_id: Int!, $user_id: Int!) {
        update_user_lm_league(where: {user_id: {_eq: $user_id}, lm_league_id: {_eq: $lm_league_id}}, _inc: {lives: -1}) {
          affected_rows
        }
      }       
        `,
      variables: {
        lm_league_id: lm_league_id,
        user_id: user_id,
      },
    }),
  })
    .then((res: any) => res.json())
    .then((result: any) => console.log(result));

  fetch("https://golao-api.hasura.app/v1/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET,
    },
    body: JSON.stringify({
      query: `
      mutation MyMutation2($lm_league_id: Int!, $user_id: Int!, $week_id: Int!) {
        update_user_lm_league(where: {user_id: {_eq: $user_id}, lm_league_id: {_eq: $lm_league_id}, lives: {_eq: 0}}, _set: {is_active: false, week_id_eliminated: $week_id}) {
          affected_rows
        }
      }
          
        `,
      variables: {
        lm_league_id: lm_league_id,
        user_id: user_id,
        week_id: week_id,
      },
    }),
  })
    .then((res: any) => res.json())
    .then((result: any) => console.log(result));
};

const updateWinPickOrLose = async (picks: TPickData[]): Promise<void> => {
  picks.forEach(async (pick: TPickData) => {
    const winner_team: TMatchWinnerData[] = await getMatchHasura(
      "FT",
      pick.week_id,
      pick.team_id
    );
    console.log(pick);
    if (winner_team == null || pick.won_pick != null) return null;
    if (
      winner_team[0]?.winner_team_id == null ||
      winner_team[0]?.winner_team_id == pick.team_id
    ) {
      await wonPick(pick.pick_id);
    } else {
      await lostPick(pick.pick_id, pick.lm_league_id, pick.user_id);
    }
  });
};

const getLastManLeagueUsersAndPicks = async (
  soccer_league_id: number,
  current_week_id: number
): Promise<TLastManLeagueUsersPicks[]> => {
  return fetch("https://golao-api.hasura.app/v1/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET,
    },
    body: JSON.stringify({
      query: `
      query MyQuery($soccer_league_id: Int!, $current_week_id: Int!) {
        last_man_league(where: {soccer_league_id: {_eq: $soccer_league_id}}) {
          users(where: {is_active: {_eq: true}}) {
            user_id
          }
          picks(where: {week_id: {_eq: $current_week_id}}) {
            user_id
          }
          lm_league_id
        }
      }   
          `,
      variables: {
        soccer_league_id: soccer_league_id,
        current_week_id: current_week_id,
      },
    }),
  })
    .then((res: any) => res.json())
    .then((result: any) => {
      return result.data?.last_man_league;
    });
};

const CheckPickNotMade = async (
  soccer_league_id: number,
  week_to_update_id: number
): Promise<void> => {
  const last_man_leagues_users_and_picks: TLastManLeagueUsersPicks[] =
    await getLastManLeagueUsersAndPicks(soccer_league_id, week_to_update_id);
  // console.log(JSON.stringify(last_man_leagues_users_and_picks, null, 4));

  last_man_leagues_users_and_picks.forEach(
    async (last_man_league: TLastManLeagueUsersPicks) => {
      const lm_league_id = last_man_league.lm_league_id;
      let all_users: number[] = [];
      last_man_league.users.forEach((user) => {
        if (user) all_users.push(user.user_id);
      });
      let all_users_pick: number[] = [];
      last_man_league.picks.forEach((user) => {
        if (user) all_users_pick.push(user.user_id);
      });

      var users_without_pick: number[] = all_users_pick
        .filter((x) => !all_users.includes(x))
        .concat(all_users.filter((x) => !all_users_pick.includes(x)));

      users_without_pick.forEach((user) => {
        // console.log(user, lm_league_id, week_to_update_id);
        if (user) loseLivePickNotMade(lm_league_id, user, week_to_update_id);
      });
    }
  );
};

export const updateWinnersAndLosers = async (
  soccer_leagues: TLeagueWithWeekObjectData[]
): Promise<void> => {
  soccer_leagues.forEach(async (soccer_league: TLeagueWithWeekObjectData) => {
    if (
      soccer_league.current_week_id == null ||
      soccer_league.current_week == null
    )
      return null;
    var week_to_update_id =
      soccer_league.current_week.week_number > 1
        ? soccer_league.current_week_id - 1
        : null;
    if (week_to_update_id == null) return null;
    if (
      soccer_league.current_week.week_number ==
      soccer_league.total_number_of_weeks
    ) {
      week_to_update_id = soccer_league.current_week_id;
    }

    const picks: TPickData[] = await getPicksHasura(
      soccer_league.soccer_league_id,
      week_to_update_id
    );
    //CheckPickNotMade(soccer_league.soccer_league_id, week_to_update_id);
    updateWinPickOrLose(picks);
  });
};
(async () => {
  const soccer_leagues: TLeagueWithWeekObjectData[] =
    await getSoccerLeaguesHasura();
  updateWinnersAndLosers(soccer_leagues);
})();
