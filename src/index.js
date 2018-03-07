'use strict';

const path = require('path');

const hbs = require('hbs');
const layouts = require('handlebars-layouts');
const express = require('express');

const routes = require('./routes');

const publicDir = path.join(__dirname, 'public');
const viewsDir = path.join(__dirname, 'views');
const partialsDir = path.join(viewsDir, 'partials');

const app = express();
app.use(express.static(publicDir));
app.set('view engine', 'hbs');
app.set('views', viewsDir);
routes(app);

const handlebars = hbs.handlebars;
handlebars.registerHelper(layouts(handlebars));
hbs.registerPartials(partialsDir, () => {
    const port = process.env.APP_PORT || 8080;

    app.listen(port, () => {
        console.info(`Сервер запущен по адресу http://localhost:${port}/`);
    });
});

module.exports = app;
