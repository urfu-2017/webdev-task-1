'use strict';
const express = require('express');
const hbs = require('hbs');
const app = express();

app.set('view engine', 'hbs');
app.use(express.static('./public'));
require('./routes')(app);

module.exports = app;

hbs.registerPartials('views/partials');
