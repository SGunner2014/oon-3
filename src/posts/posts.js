/*
    Some useful functions for interacting with the posts api to get data
*/

const axios = require("axios");
const ROOT_ADDR = "http://localhost:8080/api/user";

const getPosts = (firstID = 0, token, callback) => {
    let toAdd = "?mode=FETCH_POSTS";
    axios.get(ROOT_ADDR + toAdd + "&beginning=" + firstID + "&token=" + token)
    .then((result) => {
        if (result.data) {
            if (result.data.succ) {
                callback(result.data.contents);
            } else {
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

// This is used to get the details of a post to moderate
const getPostDetails = (postid, token, callback) => {
    let toAdd = "?mode=GET_POST_DETAILS";
    axios.get(ROOT_ADDR + toAdd + "&token=" + token + "&postid=" + postid)
    .then((result) => {
        if (result.data) {
            if (result.data.succ) {
                callback(result.data.contents);
            } else {
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

// This is used to change an aspect of a post for moderation purposes
const changePostDetails = (postid, token, post, callback) => {
    // TODO: complete
}

export {
    getPosts,
    getPostDetails,
};