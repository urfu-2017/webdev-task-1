'use strict';
const path = require('path');

const express = require('express');
const hbs = require('hbs');
const MomentHelper = require('handlebars.moment');

const routes = require('./routes');
const categories = require('./mocks/categories');
const CategoriesRepository = require('./dataAccess/categoriesRepository');
const categoriesRepository = new CategoriesRepository();
const weatherWidget = require('./middleware/weatherWidget');

for (const category of categories) {
    categoriesRepository.save(category);
}

const app = express();
const viewsDir = path.join(__dirname, 'views');
const partialsDir = path.join(viewsDir, 'partials');
const publicDir = path.join(__dirname, 'public');

app.set('view engine', 'hbs');
hbs.registerHelper('withSign', num => num > 0 ? `+${num}` : num);
MomentHelper.registerHelpers(hbs);
hbs.registerHelper('skipFirst', array => array.slice(1));
app.set('views', viewsDir);

app.use(express.static(publicDir));

app.use((err, req, res, next) => {
    console.error(err.stack);

    next();
});

app.use((req, res, next) => {
    res.locals.meta = {
        charset: 'utf-8',
        description: 'Новости'
    };

    res.locals.title = 'Новости';

    next();
});

app.use(weatherWidget.weatherWidget);

routes(app);

app.use((err, req, res) => {
    console.error(err.stack);

    res.sendStatus(500);
});

hbs.registerPartials(partialsDir, () => {
    app.listen(8080, () => {
        console.info('Open http://localhost:8080/?country=ru&query=london');
    });
});


module.exports = app;
