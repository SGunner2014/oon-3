const express = require("express");
const fetchHandler = require("./handlers/fetch");
const userHandler = require("./handlers/user");
const obtainPost = require("./posts/reddit");
const app = express();
const port = process.env.PORT || 8080; // this should ultimately be 443 in prod

// every minute obtain new posts
setInterval(obtainPost, 1000);

app.use((req, res, next) => {
    console.log(req.originalUrl);
    next();
});

app.get("/api/posts", fetchHandler);
app.get("/api/user", userHandler); // This only supports post requests!

app.listen(port, () => console.log(`Now listening on port localhost:${port}!`))