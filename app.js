const express = require("express");
const fetchHandler = require("./handlers/fetch");
const obtainPost = require("./posts/reddit");
const app = express();
const port = process.env.PORT || 8080;

// every minute obtain new posts
setInterval(obtainPost, 1000);

app.use((req, res, next) => {
    console.log(req.originalUrl);
    next();
});

app.get("/api", fetchHandler);

app.listen(port, () => console.log(`Now listening on port localhost:${port}!`))