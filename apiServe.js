const express = require("express");
const httpProxy = require("http-proxy");
const app = express();
const port = 8080;

const apiProxy = httpProxy.createProxyServer();

apiProxy.on('error', (err, req, res) => {
	console.log(err);
	res.status(500).send("Proxy Error");
});

app.all("/api/user*", (req, res) => {
	apiProxy.web(req, res, {
		target: "http://localhost:3001",
	});
});

app.all("/api/posts*", (req, res) => {
	console.log(req.path);
	apiproxy.web(req, res, {
		target: "http://localhost:3002",
	});
});

app.all("*", (req, res) => {
	apiProxy.web(req, res, {
		target: "http://localhost:3000",
	});
});

app.listen(port, () => console.log(`Gateway on port ${port}`));
