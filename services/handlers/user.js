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
    8 - Token and post id not specified
    9 - The specified post was not found
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
        params.beginning = parseInt(params.beginning);
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
                    // now, we see if there are posts before and after
                    initialQuery = `SELECT COUNT(id) AS 'postCount' FROM posts
                        WHERE id < ?
                        ORDER BY id;`;
                    conn.query(initialQuery, qData, (err, resuu, fields) => {
                        if (err) {
                            conn.end();
                            res.send({
                                succ: false,
                                message: "The database was unable to handle your request.",
                                code: 6,
                                _: err,
                            });
                        } else {
                            initialQuery = `SELECT COUNT(id) AS 'postCount' FROM posts
                                WHERE id >= ?
                                ORDER BY id;`;
                            qData = [params.beginning + 25];
                            conn.query(initialQuery, qData, (err, resuuu, fields) => {
                                if (err) {
                                    conn.end();
                                    res.send({
                                        succ: false,
                                        message: "The database was unable to handle your request.",
                                        code: 6,
                                    });
                                } else {
                                    res.send({
                                        succ: true,
                                        contents: {
                                            hasPrevious: resuu[0]["postCount"] > 0,
                                            hasNext: resuuu[0]["postCount"] > 0,
                                            dump: qData,
                                            posts: resu,
                                        }
                                    });
                                    conn.end();
                                }
                            });
                        }
                    });
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

// Handles a GET_POST_DETAILS request
function handleGetPostDetails(req, res) {
    let params = req.query;
    if (params.token && params.postid) {
        auth.verifyToken(params.token, () => {
            let conn = createConn();
            let initialQuery = `SELECT * FROM posts
                WHERE id = ?
                LIMIT 1;`;
            let qData = [params.postid];
            conn.query(initialQuery, qData, (err, resu, fields) => {
                if (err) {
                    conn.end();
                    res.send({
                        succ: false,
                        message: "The database was unable to service your request",
                        code: 6,
                    });
                } else {
                    if (resu.length == 1) {
                        conn.end();
                        res.send({
                            succ: true,
                            contents: {
                                post: resu[0],
                            },
                        });
                    } else {
                        conn.end();
                        res.send({
                            succ: false,
                            message: "The specified post was not found",
                            postid: params.postid,
                            code: 9,
                        });
                    }
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
            message: "Token and post id not specified",
            code: 8,
        });
    }
}

// Handles a UPDATE_POST request
function handleUpdatePost(req, res) {
    let params = req.query;
    if (params.token && params.postid && params.content) {
        auth.verifyToken(params.token, () => {
            let conn = createConn();
            let initialQuery = `SELECT COUNT(id)
                AS postCount
                FROM posts
                WHERE id = ?;`;
            let qData = [params.postid];
            conn.query(initialQuery, qData, (err, resu, fields) => {
                if (err) {
                    res.send({
                        succ: false,
                        message: "An issue occurred when attempting to query the database.",
                        code: 6
                    });
                    conn.end();
                } else {
                    // Now we need to get hold of the post and issue an update statement for the record
                }
            });
        }, () => {
            res.send({
                succ: false,
                message: "Invalid token",
                code: 7
            });
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
            case "GET_POST_DETAILS":
                handleGetPostDetails(req, res);
                break;
            case "UPDATE_POST":
                handleUpdatePost(req, res);
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