'use strict';
const path = require('path');

const express = require('express');
const hbs = require('hbs');

const routes = require('./routes');
const weather = require('./middlewares/weather');
const initData = require('./middlewares/initData');


const port = 8080;

const app = express();

module.exports = app;

const viewsDir = path.join(__dirname, 'views');
const publicDir = path.join(__dirname, 'public');
const partialsDir = path.join(viewsDir, 'partials');

app.use(express.static(publicDir));
app.set('view engine', 'hbs');
app.set('views', viewsDir);

app.use(weather.loader);
app.use(initData.loader);

routes(app);
hbs.registerPartials(partialsDir, () => {
    app.listen(port, () => {
        console.info(`server is running: http://localhost:${port}/`);
    });
});


