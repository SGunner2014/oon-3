const axios = require("axios");
const ROOT_URL = "http://localhost:3000/api/user"; // will eventually be https

// Queries the remote server and attempts to log the user in
const login = (username, password, callback) => {
    // this will be replaced with post
    let url = ROOT_URL + `?mode=LOGIN_USER&username=${username}&password=${password}`;
    axios.get(url)
    .then((response) => {
        let data = response.data;
        if (data.succ) {
            let token = data.contents.token;
            callback(token);
        } else {
            console.log(data.message);
            callback(false);
        }
    })
    .catch((e) => {
        console.log(e);
        callback(false);
    });
};

module.exports = {
    login: login,
};