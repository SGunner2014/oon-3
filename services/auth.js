const express = require("express");
const userHandler = require("./handlers/user");

const app = express();

app.get("/api/auth*", (req, res) => {
	userHandler(req, res);
});
