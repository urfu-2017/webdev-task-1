'use strict';
const express = require('express');
const hbs = require('hbs');
const path = require('path');
const routes = require('./routes');

const app = express();

app.set('view engine', 'hbs');

// #region register partials from dir

// instead hbs.registerPartials(path.join(__dirname, '/views/partials'));
// https://gist.github.com/benw/3824204

const fs = require('fs');

const partialsDir = path.join(__dirname, '/views/partials');

const filenames = fs.readdirSync(partialsDir);

filenames.forEach(function (filename) {
    var matches = /^([^.]+).hbs$/.exec(filename);
    if (!matches) {
        return;
    }
    var name = matches[1];
    var template = fs.readFileSync(partialsDir + '/' + filename, 'utf8');
    hbs.registerPartial(name, template);
});
// #endregion

app.use(express.static('public'));

routes(app);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    console.error(err);

    res.sendStatus(500);
});

module.exports = app;
