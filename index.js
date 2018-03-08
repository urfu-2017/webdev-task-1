'use strict';

const express = require('express');
const app = express();
const hbs = require('hbs');
const path = require('path');

const routes = require('./routes');

app.set('view engine', 'hbs');
app.use(express.static(path.resolve('public')));
routes(app);

hbs.registerPartials(path.resolve('views/partials'), () => {
    app.listen(8080);
});

module.exports = app;
