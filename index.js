require('dotenv').config();
const fetch = require("node-fetch");

function getLeagues() {
    fetch(process.env.API_URL + "leagues" + process.env.API_TOKEN_PARAM + process.env.API_KEY)
        .then(response => response.json())
        .then((res) => {
            console.log(res.data)
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
getLeagues();
