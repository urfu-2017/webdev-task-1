'use strict';

const path = require('path');

const express = require('express');
const hbs = require('hbs');

const routes = require('./routes');
const topics = require('./public/settings/topics');
const Topic = require('./models/topic');
const { getWeatherInfo } = require('./middlewares/weatherMiddleware');
const { setSettings } = require('./middlewares/startupMiddleware');
const startupSettings = require('./public/settings/startupSettings');
const config = require('./public/settings/config');


for (const topic of topics) {
    new Topic(topic).save();
}

const app = express();

const viewsDir = path.join(__dirname, 'views');
const partialsDir = path.join(viewsDir, 'partials');
const publicDir = path.join(__dirname, 'public');

app.set('view engine', 'hbs');
app.set('views', viewsDir);

app.use(express.static(publicDir));
app.use((req, res, next) => setSettings(req, res, next, startupSettings));
app.use(getWeatherInfo);
routes(app);

hbs.registerPartials(partialsDir, () => {
    let port = config.port;
    app.listen(port);
    console.info(`http://localhost:${port}`);
});

module.exports = app;
