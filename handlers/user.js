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
*/

const auth = require("../auth/auth");

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

// Root handler for all incoming requests
const userHandler = (req, res) => {
    let params = req.query;

    if (params.mode) {
        switch(params.mode) {
            case "LOGIN_USER":
                handleUserLogin(req, res);
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