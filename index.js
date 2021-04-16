require('dotenv').config();
const fetch = require("node-fetch");

const api_key_token = process.env.API_TOKEN_PARAM + process.env.API_KEY;

function getLeagues() {
    var endpoint = process.env.API_URL + "leagues" + api_key_token;

    fetch(endpoint)
        .then(response => response.json())
        .then((res) => {
            console.log(res.data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function getLeague(league_id) {
    var endpoint = process.env.API_URL + "leagues/" + league_id + api_key_token;

    fetch(endpoint)
        .then(response => response.json())
        .then((res) => {
            console.log(res.data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}


function getNWeekFromLeague(n_week, league_id) {
    var seasons = [];
    var rounds = [];
    var fixtures = [];

    var round_start_date;
    var round_end_date;

    var seasons_endpoint;
    var rounds_endpoint;
    var fixtures_endpoint;

    seasons_endpoint = process.env.API_URL + "seasons" + api_key_token;

    // Getting all available seasons
    fetch(seasons_endpoint)
        .then(response => response.json())
        .then((res) => {
            seasons = res.data;
            // Find current_season_id from current season from N league_id
            var current_season_id = seasons.find(x => (x.is_current_season === true &&  x.league_id === league_id)).id

                // Getting all rounds from current seasons
                rounds_endpoint = process.env.API_URL + "rounds/season/" + current_season_id + api_key_token;
                fetch(rounds_endpoint)
                    .then(response => response.json())
                    .then((res) => {
                        rounds = res.data;
                        // Find N week to get N week start date and N week end date
                        var n_round = rounds.find(x => (x.name === n_week))
                        round_start_date = n_round.start
                        round_end_date = n_round.end
                            
                            //Getting all fixtures between start and end date from N week
                            fixtures_endpoint = process.env.API_URL + "fixtures/between/" + round_start_date + "/" + round_end_date + api_key_token;
                            fetch(fixtures_endpoint)
                                .then(response => response.json())
                                .then((res) => {
                                    fixtures = res.data;
                                    console.log(fixtures)
                                })
                                .catch((error) => {
                                    console.error('Error:', error);
                                });
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });

        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

// API TEST CALLS:

//getLeagues();
//getLeague(501);
//getNWeekFromLeague(2, 271);
