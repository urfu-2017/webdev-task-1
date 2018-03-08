'use strict';

const path = require('path');

const bodyParser = require('body-parser');
const express = require('express');
const hbs = require('hbs');

const routes = require('./routes');

const app = express();

const viewsDir = path.join(__dirname, 'views');
const partialsDir = path.join(viewsDir, 'partials');
const publicDir = path.join(__dirname, 'public');

app.set('view engine', 'hbs');

app.set('views', viewsDir);

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use((err, req, res, next) => {
    console.error(err.stack);

    next();
});

routes(app);

app.use((err, req, res, next) => {
    /* eslint no-unused-vars: 0 */
    console.error(err.stack);

    res.sendStatus(500);
});

hbs.registerHelper('toFixed', function (number) {
    return number.toFixed(2);
});

hbs.registerPartials(partialsDir, () => {
    const port = 8080;

    app.listen(port, () => {
        console.info(`Server started on ${port}`);
        console.info(`Open http://localhost:${port}/`);
    });
});

module.exports = app;
