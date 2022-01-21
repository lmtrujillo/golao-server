import { graphqlHTTP } from 'express-graphql';
import { buildSchema, graphql, GraphQLBoolean, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';
import { SportsMonk } from './api/classes/SportsMonk';
import { getTeam } from './api/functions/teamsApi'
const fetch = require('node-fetch');

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



(async () => {
  await console.log(getTeam(939));
})();



/*


fetch('https://golao-api.hasura.app/v1/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-hasura-admin-secret': 'gaEQRECn1HLz5Gho6uMrC3He0a9ioof87djKHZ0TaHBs9conVi6JPeNgaMfw0py3'
  },
  body: JSON.stringify({
    query: `
    mutation updateTeams($objects: [team_insert_input!]!) {
      insert_team(on_conflict: {constraint: team_team_id_sports_monk_key, update_columns: [team_name, venue, venue_url]}, objects: $objects) {
        affected_rows
      }
    }
    
      `,
      variables: {
        objects: [
          {logo_url: "www.test.com", team_name: "Test 51", venue: "Test stadium 1", venue_url: "www.venue.com", team_id_sports_monk: 51}, 
          {logo_url: "www.test2.com", team_name: "Test 52", venue: "Test stadium 2", venue_url: "www.venue2.com", team_id_sports_monk: 52}, 
          {logo_url: "www.test3.com", team_name: "Test 53", venue: "Test stadium 3", venue_url: "www.venue3.com", team_id_sports_monk: 53}
        ]
      }
  }),
})
  .then((res: any) => res.json())
  .then((result: any) => console.log(result));


  */
