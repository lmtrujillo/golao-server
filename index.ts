import { graphqlHTTP } from "express-graphql";
import {
  buildSchema,
  graphql,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";
import { SportsMonk } from "./api/classes/SportsMonk";
import { getTeam, getTeamsByCountry } from "./api/functions/teamsApi";
import { getVenue } from "./api/functions/venuesApi";

const fetch = require("node-fetch");

// API TEST CALLS:

//async function testing () {
//  console.log(await getLeagues());
//  console.log(await getTeam(939));
//  console.log(await getTeamByName("Midtjylland"));
//  console.log(await getTeamsBySeason(17328));
//  console.log(await getMatchesFromNWeekLeague(2, 271));
//  console.log(await getWeeksFromNLeague(271));
//  console.log(await getMatch(16773965));
//    console.log(await getMatchesTimeframe('2020-09-19', '2020-09-21'));
//    console.log(await getMatchesFromNWeekLeague(2, 271));
// console.log(await getMatchesTimeframeTeam('2020-09-19', '2020-09-21', 939))
// console.log(await getOddsFixtureBookmaker(16773965, 1))
// console.log(await getOddsFixtureMarket(16773965, 1))
// console.log(await getOddsFixture(16773965))
//   console.log(await getInplayOddsFixture(11865351))
//   console.log(await getSeasons())
//   console.log(await getSeason(15949))
//    const data = await getCurrentLeaguesByTeam(939);
//    console.log(JSON.stringify(data));
//    const data = await getLeaguesByTeam(939);
//    console.log(JSON.stringify(data));
//   console.log(await getVenue(1))
//  console.log(await getVenuesSeason(17328))
//  console.log(await getWeek(194968))
//  console.log(await getWeeksNSeason(17141))
//}

//testing();

// SEASONS
/*
MUTATIONS FROM NODE TO GRAPHQL

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    user_id: {type: GraphQLInt},
    display_name: {type: GraphQLString},
    email: {type: GraphQLString},
    email_verified: {type: GraphQLBoolean},
    is_anonymous: {type: GraphQLBoolean},
    phone_number: {type: GraphQLString},
    photo_url: {type: GraphQLString},
    provider_id: {type: GraphQLString},
    refresh_token: {type: GraphQLString},
    tenant_id: {type: GraphQLString},
    uid: {type: GraphQLString},
    username: {type: GraphQLString},
  })
})

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllUsers: {
      type: new GraphQLList(UserType),
      args: { id: { type: GraphQLInt}},
      resolve(parent, args) {
        return userData
      }
    }
  }
})

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: {
      type: UserType,
      args: {
        user_id: {type: GraphQLInt},
        display_name: {type: GraphQLString},
        email: {type: GraphQLString},
        email_verified: {type: GraphQLBoolean},
        is_anonymous: {type: GraphQLBoolean},
        phone_number: {type: GraphQLString},
        photo_url: {type: GraphQLString},
        provider_id: {type: GraphQLString},
        refresh_token: {type: GraphQLString},
        tenant_id: {type: GraphQLString},
        uid: {type: GraphQLString},
        username: {type: GraphQLString},
      },
      resolve(parent, args) {

      }
    }
  }
})

const schema = new GraphQLSchema({query: RootQuery, mutation: Mutation});


app.use('/graphql/user', graphqlHTTP({
  schema,
  graphiql: true
}))



cron.schedule("* * * * * *", async function(){
  console.log(await getLeagues());
  shell.exec
})
*/

/*
type matchInfo = {
  id: number;
  home_team_id: number;
  away_team_id: number;
  home_team_goals: number;
  away_team_goals: number;
}

let sm =  new SportsMonk();

const results: [matchInfo] = ( async () => {
  await sm.getResults();
})()
*/
