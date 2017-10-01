"use strict";

const express = require('express');
const fs = require('fs');
const https = require('https');

const app = express();

app.use((req, res, next) => {
    console.log('Got request', req.path, req.method);

    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
    res.setHeader('Access-Control-Allow-Origin', '*');

    return next();
});

app.use(express.static('../frontend'))

let options = {
    key  : fs.readFileSync('/boilerplate/certs/testing.key'),
    cert : fs.readFileSync('/boilerplate/certs/testing.crt')
};

const PORT = 8080;
https.createServer(options, app).listen(PORT, function () {
    console.log('Extension Boilerplate service running on https', PORT);
});
