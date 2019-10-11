/*
Some authentication code for securing the admin area of this app
*/

const mysql = require("mysql");
const shajs = require("sha.js");

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

// Verifies a supplied login token
function verifyToken(token, succ, nosucc) {
    let conn = createConn();
    let initialQuery = `SELECT * FROM login_tokens
        WHERE userid = ?;`;
    let vars = [token];

    conn.query(initialQuery, vars, (err, res, fields) => {
        conn.end(); // close the connection

        if (res.length === 1) {
            if (res.token) {
                if (res.token === token)
                    succ();
            }
        }

        nosucc();
    });
}

// Creates a new login token for a user - but doesn't register it
function generateRandomString(length) {
    let alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    alphabet = alphabet.split(""); // get the chars
    let toReturn = "";

    for (let i = 0; i < length; i++) {
        let randChar = Math.floor(Math.random() * alphabet.length);
        toReturn += alphabet[randChar];
    }

    return toReturn;
}

// Registers a fresh login token for a specified user
function registerToken(userid, token, conn, callback) {
    let initialQuery = `SELECT COUNT(id) AS tokenCount FROM login_tokens
        WHERE userid = ?;`;
    let qData = [userid];

    conn.query(initialQuery, qData, (err, res, fields) => {
        if (res.length == 1) {
            let row = res[0];
            if (row["tokenCount"] > 0) { // we need to update the token
                let nextQuery = `UPDATE  login_tokens
                    SET token = ?
                    WHERE userid = ?;`;
                let params = [token, userid];
                conn.query(nextQuery, params, (err, res, fields) => {
                    if (err) // see if an error occurred
                        callback(false);
                    else
                        callback(token);
                    conn.end();
                });
            } else { // we need to create a new token
                let nextQuery = `INSERT INTO login_tokens
                    (userid, token)
                    VALUES (?, ?);`;
                let params = [userid, token];
                conn.query(nextQuery, params, (err, res, fields) => {
                    if (err)
                        callback(false);
                    else
                        callback(token);
                });
            }
        } else {
            conn.end();
            console.log(err);
            callback(false);
        }
    });
}

// Attempts to log a user in with the supplied credentials
// Callback must be a function that takes one argument, which will either be a string (token) or false, if the login has failed.
function login(username, password, callback) {
    let conn = createConn();

    // We need to verify that the password and the username are correct.
    let initialQuery = `SELECT * FROM users WHERE username = ?`;
    let qdata = [username];
    conn.query(initialQuery, qdata, (err, res, fields) => {
        if (err) {
            console.log(err);
            conn.end();
        } else {
            if (res.length == 1) {
                let row = res[0]; // get the first row
                let salt = row["salt"];
                let passhash = row["passhash"];
                let hashAttempt = shajs("sha256").update(password + salt).digest("hex");
                if (hashAttempt === passhash) {
                    // Now, we need to create a new login key and register it to this user
                    let newToken = generateRandomString(256);
                    registerToken(row["id"], newToken, conn, () => {
                        callback(newToken);
                    });
                } else {
                    conn.end();
                    callback(false);
                }
            } else {
                conn.end();
                callback(false);
            }
        }
    });
};

// Registers a new user using a specified username and password
// Callback should be a function that takes either a token or false when not successful
function register(username, password, callback) {
    // we need to check if that username has already been taken
    let conn = createConn();
    let initialQuery = `SELECT COUNT(id) AS userCount
        FROM users
        WHERE username = ?;`;
    let params = [username];
    conn.query(initialQuery, params, (err, res, fields) => {
        if (err) {
            conn.end();
            callback(false);
        } else {
            if (res.length === 1) {
                if (res[0].userCount === 0) {
                    let salt = generateRandomString(10);
                    let passhash = shajs("sha256").update(password + salt).digest("hex");
                    let nextQuery = `INSERT INTO users
                        (username, salt, passhash, last_login)
                        VALUES (?, ?, ?, ?);`
                    let params = [username, salt, passhash, new Date().getTime() / 1000];
                    conn.query(nextQuery, params, (err, res, fields) => {
                        if (err)
                            callback(false);
                        else
                            login(username, password, callback);
                        conn.end();
                    });
                } else {
                    conn.end();
                    callback(false);
                }
            } else {
                conn.end();
                callback(false);
            }
        }
    });
}

module.exports = {
    login: login,
    register: register,
    verifyToken: verifyToken
}