// This contains the websocket code that is used to moderate posts
// This runs on port 3003

const WebSocket = require("ws");
const handlers = require("./misc/websocket.js");

const wss = new WebSocket.Server({port: 3003});

const db = require("./misc/database");
db.fetchRecords("posts", {}, (res, err) => {
    if (res) {
        console.log(res);
    } else {
        console.log(err);
    }
});

// A new connection has been established
wss.on("connection", (ws) => {
    ws.on("message", (data) => {
        let d = JSON.parse(data);
        if (d.mode) {
            switch(d.mode) {
                case "UPDATE_ARTICLE":
                    break;
            }
        }
    });
});