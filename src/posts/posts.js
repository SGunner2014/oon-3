/*
    Some useful functions for interacting with the posts api to get data
*/

const axios = require("axios");
const ROOT_ADDR = "http://localhost:8080/api/auth";

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
    let toAdd = "?mode=ALTER_POST";
    // Let's serialise some data first
    // In hindsight, this would have been better served over POST, but we'll get to that another day.
    let serialisedData = "";
    let attributes = ["title", "link", "redditLink", "isOnion"];
    for (let i = 0; i < attributes.length; i++) {
        serialisedData += "&" + attributes[i] + "=" + encodeURI(post[attributes[i]]);
    }
    axios.get(ROOT_ADDR + toAdd + "&token=" + token + serialisedData)
    .then((res) => {
        if (res.data) {
            if (res.data.succ) {
                callback(true);
            } else {
                callback(false);
            }
        } else {
            callback(false);
        }
    })
    .catch((e) => {
        console.log(e);
        callback(false);
    });
}

export {
    getPosts,
    getPostDetails,
    changePostDetails,
};