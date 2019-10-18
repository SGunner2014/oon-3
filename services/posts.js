const express = require("express");
const postsHandler = require("./handlers/posts");

const app = express();

app.get("/api/posts*", (req, res) => {
	postsHandler(req, res);
});

app.listen(3002);
