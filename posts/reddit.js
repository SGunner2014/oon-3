// This script runs automatically and obtains new posts from reddit once every minute

const axios = require("axios");
const mysql = require("mysql");
const ROOT_ADDR_ONION = "https://www.reddit.com/r/theonion/new.json";
const ROOT_ADDR_NOT_ONION = "https://www.reddit.com/r/nottheonion/new.json";

// Creates a new connection to the database
function createConn() {
    let conn = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "pass",
        database: "oon"
    });
    conn.connect();

    return conn;
}

// Processes a list of posts and puts them into the database.
function processPosts(result, isOnion) {
    let response = result.data;

    if (response.data && response.data.children) {
        let posts = response.data.children;
        let conn = createConn();
        let insQuery = `INSERT INTO \`posts\`
                     (title, link, redditLink, isOnion)
                     VALUES
                     (?, ?, ?, ?);`;
        let selQuery = `SELECT COUNT(id) AS postCount from posts where redditLink = ? or link = ?`;

        for (let i = 0; i < posts.length; i++) {
            let pdata = posts[i].data;
            let qdata = [
                pdata.permalink,
                pdata.url
            ];

            conn.query(selQuery, qdata, (err, res, fields) => {
                if (res) {
                    if (res[0].postCount === 0) {
                        qdata = [
                            pdata.title,
                            pdata.url,
                            pdata.permalink,
                            isOnion
                        ];

                        conn.query(insQuery, qdata, (err, res, fields) => {
                            console.log(err);
                        });
                    }
                }
            });
        }

        setTimeout(() => conn.end, 1000);
    } else {
        console.log("failed to get posts");
    }
}

// first, we get the onion and then the not onion and add them to the database
const obtainPost = function() {
    axios.get(ROOT_ADDR_ONION)
    .then((response) => {
        processPosts(response, true);
    }).catch((e) => {
        console.log(e);
    });

    axios.get(ROOT_ADDR_NOT_ONION)
    .then((response) => {
        processPosts(response, false);
    }).catch((e) => {
        console.log(e);
    });
};

module.exports = obtainPost;