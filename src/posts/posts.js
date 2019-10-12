/*
    Some useful functions for interacting with the posts api to get data
*/

const axios = require("axios");
const ROOT_ADDR = "http://localhost:3000/api/user?mode=FETCH_POSTS";

export const getPosts = (firstID = 0, token, callback) => {
    axios.get(ROOT_ADDR + "&beginning=" + firstID + "&token=" + token)
    .then((result) => {
        if (result.data) {
            if (result.data.succ) {
                console.log(result.data.contents);
                callback(result.data.contents);
            } else {
                console.log(result.data);
                callback(false);
            }
        } else {
            callback(false);
        }
    })
    .catch((e) => {
        console.log(e);
    });
};