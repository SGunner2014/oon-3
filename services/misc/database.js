// Includes helpful functions for interacting with the database

const mysql = require("mysql");

// Creates a connection to the database
const createConn = () => {
    let conn = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "pass",
        database: "oon"
    });
    conn.connect();

    return conn;
};

// Fetches all relevant records from the specified table
const fetchRecords = (table, criteria, callback) => {
    const conn = createConn();
    let data = [];
    let query = `SELECT * FROM ${table} WHERE `;

    // Figure out the number of criteria
    for (let i = 0; i < Object.keys(criteria).length; i++) {
        query += "? = ? AND";
    }

    // Put all the fields and the data into a list so we can use it with the query
    Object.keys(criteria).forEach((val) => {
        data.push(val);
        data.push(criteria[val]);
    });

    // Remove the final 'AND'
    query = query.substr(0, query.length - 4);

    // Query the database and process the results
    conn.query(query, data, (err, res, fields) => {
        conn.end();
        if (err) {
            callback(false, err);
        } else {
            callback(res);
        }
    });
}

// Inserts a new record into the specified table
const insertRecord = (table, data, callback) => {
    const conn = createConn();
    let query = `INSERT INTO ${table} (`;
    let secondQuery = ") VALUES (";
    let dataArray = [];

    // Loop through the data and form a basic query and dataset to go with it
    Object.keys(data).forEach((key) => {
        query += "?, ";
        secondQuery += "?, ";
        dataArray.push(key);
        dataArray.push(data[key]);
    });

    query = query.substring(0, query.length - 2) + secondQuery.substring(0, secondQuery.length - 2) + ")"; 

    // Execute query and process results
    conn.query(query, dataArray, (err, res) => {
        if (err) {
            callback(false, err);
        } else {
            callback(res);
        }
    });
};

module.exports = {
    fetchRecords: fetchRecords,
    insertRecord: insertRecord,
};