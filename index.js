'use strict';

const path = require('path');

const hbs = require('hbs');
const express = require('express');

const routes = require('./routes');
const { port } = require('./config/default.json');
const { info, serverError } = require('./middlewares');

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(info);
app.use('/', routes);
app.use(serverError);

hbs.registerPartials(path.join(__dirname, 'views', 'partials'), () => {
    app.listen(process.env.PORT || port);
});

module.exports = app;
