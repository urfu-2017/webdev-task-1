'use strict';

const path = require('path');

const bodyParser = require('body-parser');
const config = require('config');
const express = require('express');
const hbs = require('hbs');
const morgan = require('morgan');

const Category = require('./models/category');
const categories = require('./mocks/categories');
const routes = require('./routes');

for (const category of categories) {
    new Category(category).save();
}

const app = express();

const viewsDir = path.join(__dirname, 'views');

const partialsDir = path.join(viewsDir, 'partials');

const publicDir = path.join(__dirname, 'public');

app.set('view engine', 'hbs');

app.set('views', viewsDir);

if (config.get('debug')) {
    app.use(morgan('dev'));
}

app.use(express.static(publicDir));

app.use(bodyParser.json());

app.use((err, req, res, next) => {
    console.error(err.stack);

    next();
});

// console.log((getWeatherData));
// getWeatherData.then(console.log, null);
app.use((req, res, next) => {
    res.locals.meta = {
        charset: 'utf-8',
        description: 'Новости'
    };

    res.locals.title = 'Новости';

    res.locals.widgets = 'yolo';

    next();
});

routes(app);

app.use((err, req, res) => {
    console.error(err.stack);

    res.sendStatus(500);
});

hbs.registerPartials(partialsDir, () => {
    // Запускаем сервер на порту 8080
    app.listen(8080, () => {
        console.info('Open http://localhost:8080/');
    });
});

module.exports = app;
