'use strict';
const path = require('path');

const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const weather = require('./app/middlewares/weather');

const routes = require('./routes');
const notFound = require('./app/middlewares/notFound');
const setInitialState = require('./app/middlewares/setInitialState');
const handleErrors = require('./app/middlewares/handleErrors');
const { port } = require('./config');

const app = express();
const viewsDir = path.join(__dirname, 'app/views');
const partialsDir = path.join(viewsDir, 'partials');
const publicDir = path.join(__dirname, 'app/public');

app.set('view engine', 'hbs');
app.set('views', viewsDir);

app.use(express.static(publicDir));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(weather);
app.use(setInitialState);
routes(app);
notFound(app);
app.use(handleErrors);

// Чтобы успел по всем шаблонам пройтись и "понять" их
hbs.registerPartials(partialsDir, () => {
    app.listen(port, () => {
        console.info(`Server started on ${port}`);
        console.info(`Open http://localhost:${port}/`);
    });
});

module.exports = app;
