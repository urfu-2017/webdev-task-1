'use strict';

const path = require('path');

const express = require('express');
const config = require('config');

const app = express();

app.use(express.static(path.join(__dirname, '/public')));

require('./routes')(app);

app.use((err, req, res, next) => {
    /* eslint no-unused-vars: 0*/

    console.error(err);
    res.sendStatus(500);
});

app.listen(process.env.PORT || config.get('port'));

module.exports = app;
