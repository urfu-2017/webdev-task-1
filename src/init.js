'use strict';

const express = require('express');
const hbs = require('hbs');

const routes = require('./routes');
const settings = require('./settings');

function loadInitialData() {
    const Category = require('./models/category');
    const categories = require('./data/categories');

    for (const category of categories) {
        new Category(category.name, category.title, category.icon).save();
    }
}

loadInitialData();

const app = express();
app.use(express.static(settings.publicDir));
app.set('view engine', 'hbs');
app.set('views', settings.viewsDir);
routes(app);

hbs.registerPartials(settings.partialsDir, () => {
    const port = settings.serverPort;

    app.listen(port, () => {
        console.info(`Сервер запущен по адресу http://localhost:${port}/`);
    });
});

module.exports = app;
