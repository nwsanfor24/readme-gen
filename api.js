require("dotenv").config();

const token = process.env.GITHUB_TOKEN;
const axios = require("axios");

const api = {

    getUser(username) {
        const queryURL = `https://api.github.com/user/${username}`;

        return axios.get(queryURL, {
            headers: {
                "Authorization": `token ${token}`
            }
        });
    }
}

module.exports = api;