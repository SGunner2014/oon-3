const express = require("express");
const postsHandler = require("./handlers/user");

const app = express();

app.get("/api/user*", (req, res) => {
	postsHandler(req, res);
});

app.listen(3002);
