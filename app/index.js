'use strict';
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const toFixed = require('handlebars-helpers')().toFixed;
const dateFormat = require('handlebars-dateformat');
const route = require('./routes');

const staticDirectory = path.join(__dirname, 'public');
const viewsDirectory = path.join(__dirname, 'views');
const partialsDirectory = path.join(viewsDirectory, 'partials');
const port = 8000;

const app = express();

app.use(express.static(staticDirectory));

app.set('view engine', 'hbs');
app.set('views', viewsDirectory);

hbs.registerHelper('fixed', toFixed);
hbs.registerHelper('dateFormat', dateFormat);

route(app);

hbs.registerPartials(partialsDirectory, () => {
    app.listen(port, () => console.info(`http://localhost:${port}`));
});

module.exports = app;
