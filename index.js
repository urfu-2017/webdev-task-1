'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const serveStatic = require('serve-static');
const hbs = require('hbs');

const app = express();

const data = require('./data.json');

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(serveStatic(path.join(__dirname, 'public')));

hbs.registerPartials(path.join(__dirname, 'views/partials'), () => {
    app.set('view options', { layout: 'base' });
    app.listen(8080);
});

hbs.localsAsTemplateData(app);
app.locals.document = data.document;

app.use('/', require('./routes/root'));

module.exports = app;
