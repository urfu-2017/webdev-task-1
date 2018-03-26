'use strict';

const dotenv = require('dotenv');
const express = require('express');
const exphbs = require('express-handlebars');

const { newsItems } = require('./middlewares/getNewsItems');
const { weather } = require('./middlewares/getWeather');
const routes = require('./routes');

const defaultValues = dotenv.config('./env').parsed;
const app = express();

app.use(express.static('./public'));
app.use(weather);
app.use(newsItems);
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

routes(app);
app.listen(
    defaultValues.PORT,
    () => console.info(`app listening on port ${defaultValues.PORT}`)
);

module.exports = app;
