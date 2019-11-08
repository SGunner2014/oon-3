const express = require("express");
const postsHandler = require("./handlers/fetch");
const obtainPost = require("../posts/reddit");

setInterval(obtainPost, 3000);

const app = express();

app.get("/api/user*", (req, res) => {
	postsHandler(req, res);
});

app.listen(3002);
