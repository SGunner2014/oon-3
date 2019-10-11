const axios = require("axios");
const mysql = require("mysql");

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

// handles a FETCH_ARTICLE request
function handleFetch(req, res) {
    let conn = createConn();

    let query = "SELECT * FROM `posts` ORDER BY RAND() LIMIT 1"; // Obtain 1 random post
    conn.query(query, (error, results, fields) => {
        res.send({
            succ: true,
            contents: results,
            error: error,
            code: 0
        });

        conn.end();
    });
}

// This handles requests for fetching a new record from the database
const fetchHandler = function(req, res) {

    let params = req.query;

    if (params.mode) {
        switch(params.mode.toUpperCase()) {
            case "FETCH_ARTICLE":
                handleFetch(req, res);
                break;
            default:
                res.send({
                    succ: false,
                    msg: "Invalid operating mode specified.",
                    code: 2
                });
        }
    } else {
        res.send({
            succ: false,
            msg: "Operating mode not specified.",
            code: 1
        });
    }
}

module.exports = fetchHandler;