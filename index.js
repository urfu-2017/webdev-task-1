'use strict';

const path = require('path');

const express = require('express');
const hbs = require('hbs');

const routes = require('./routes');

const app = express();

const viewsDir = path.join(__dirname, 'views');

app.set('view engine', 'hbs');
app.set('views', viewsDir);

routes(app);

app.listen(8080);
module.exports = app;
