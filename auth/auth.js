/*
Some authentication code for securing the admin area of this app
*/

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

// Attempts to log a user in with the supplied credentials
function login(username, password, callback) {
    let conn = createConn();
}