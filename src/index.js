'use strict';

const path = require('path');
const express = require('express');
const routes = require('./routes');

const app = express();

const publicDir = path.join(__dirname, 'public');
app.use(express.static(publicDir));

const viewsDir = path.join(__dirname, 'views');
app.set('view engine', 'hbs');
app.set('views', viewsDir);

routes(app);

const port = 8080;
app.listen(port, () => {
    console.info(`Сервер запущен по адресу http://localhost:${port}/`);
});

module.exports = app;
