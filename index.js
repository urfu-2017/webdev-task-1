'use strict';

const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const url = require('url');
require('handlebars-helpers').comparison();

const config = require('./config.json');
const { error404 } = require('./middlewares/notFound');
const { saveQueryParameters } = require('./middlewares/saveQueryParameters');
const { setInitialData } = require('./middlewares/setInitialData');
const { getWeather } = require('./middlewares/getWeather');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public')));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts')
}));
app.set('view engine', '.hbs');

app.use(setInitialData);
app.use(saveQueryParameters);
app.use(getWeather);

require('./routes')(app);

app.use(error404);

if (require.main === module) {
    const serverUrl = url.format({
        protocol: 'https',
        hostname: config.serverHost,
        port: config.serverPort
    });
    // eslint-disable-next-line no-console
    app.listen(config.serverPort, () => console.log(`Сервис работает по адресу:\n${serverUrl}`));
}

module.exports = app;
