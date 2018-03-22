'use strict';

const express = require('express');
const hbs = require('hbs');
const path = require('path');

const helpers = require('handlebars-helpers')();
const toFixed = helpers.toFixed;
hbs.registerHelper('toFixed', toFixed);
hbs.registerHelper('dateFormat', require('handlebars-dateformat'));

const { list } = require('./controllers/categories');
const { renderNews } = require('./controllers/news');
const { initNewsFetcher } = require('./models/news');
const { loadCategories } = require('./models/category');

const app = express();
const viewsDir = path.join(__dirname, 'views');
const partialsDir = path.join(viewsDir, 'partials');
const publicDir = path.join(__dirname, 'public');
app.set('view engine', 'hbs');
app.set('views', viewsDir);

app.use(express.static(publicDir));

app.get('/', list);
app.get('/news/:category', renderNews);

initNewsFetcher('keys.json');
loadCategories('categories.json');


hbs.registerPartials(partialsDir, () => {
    app.listen(8080, () => {
        console.info('Listening on http://localhost:8080');
    });
});

module.exports = app;
