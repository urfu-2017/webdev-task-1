'use strict';

const path = require('path');

const express = require('express');
const exphbs = require('express-handlebars');
const dotenv = require('dotenv');

const routes = require('./routes');
const { weather } = require('./middlewares/getWeather');
const { newsItems } = require('./middlewares/getNewsItems');

const defaultValues = dotenv.config({ path: path.join(__dirname, '.env') }).parsed;
const app = express();

app.use(express.static(path.join(__dirname, '/public')));
app.use(weather);
app.use(newsItems);
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

routes(app);
app.listen(defaultValues.PORT,
    () => console.info(`app listening on port ${defaultValues.PORT}`));

module.exports = app;
