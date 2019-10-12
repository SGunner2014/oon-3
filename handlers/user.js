/*
    This is the handler for all user account actions
    It supports:
    registering, logging in, verifying login tokens
*/

/*
    Error codes:
    1 - Operating mode not specified
    2 - Invalid operating mode
    3 - Username and password not specified
    4 - Login failed
    5 - Token and beginning not specified
    6 - The database was unable to handle your request
    7 - Invalid token
*/

const auth = require("../auth/auth");
const mysql = require("mysql");

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

// Handles a user logging in
function handleUserLogin(req, res) {
    let params = req.query;
    if (params.username && params.password) {
        auth.login(params.username, params.password, (token) => {
            if (token) {
                res.send({
                    succ: true,
                    contents: {
                        token: token
                    }
                });
            } else {
                res.send({
                    succ: false,
                    message: "Login failed.",
                    code: 4
                });
            }
        });
    } else {
        res.send({
            succ: false,
            message: "Username and password not specified.",
            code: 3
        });
    }
}

// Handles a FETCH_POSTS request
function handleMassFetch(req, res) {
    let params = req.query;
    if (params.beginning && params.token) {
        auth.verifyToken(params.token, () => {
            let conn = createConn();
            let initialQuery = `SELECT * FROM posts
            WHERE id >= ?
            ORDER BY id
            LIMIT 25;`;
            let qData = [params.beginning];
            conn.query(initialQuery, qData, (err, resu, fields) => {
                if (err) {
                    res.send({
                        succ: false,
                        message: "The database was unable to handle your request.",
                        code: 6,
                    });
                    conn.end();
                } else {
                    res.send({
                        succ: true,
                        contents: resu,
                    });
                    conn.end();
                }
            });
        }, () => {
            res.send({
                succ: false,
                message: "Invalid token",
                code: 7,
            });
        });

    } else {
        res.send({
            succ: false,
            message: "Beginning or token not specified",
            code: 5,
        });
    }
}

// Root handler for all incoming requests
const userHandler = (req, res) => {
    let params = req.query;

    if (params.mode) {
        switch(params.mode) {
            case "LOGIN_USER":
                handleUserLogin(req, res);
                break;
            case "FETCH_POSTS":
                handleMassFetch(req, res);
                break;
            default:
                res.send({
                    succ: false,
                    message: "Invalid operating mode",
                    code: 2,
                    params: params
                });
        }
    } else {
        res.send({
            succ: false,
            message: "Operating mode not specified.",
            code: 1,
        });
    }
};

module.exports = userHandler;