'use strict';

const hbs = require('hbs');
const express = require('express');

const routes = require('./routes');
const settings = require('./settings');
const initHelpers = require('./utils/init-helpers');

const app = express();
app.use(express.static(settings.publicDir));
app.set('view engine', 'hbs');
app.set('views', settings.viewsDir);
initHelpers.registerPartialsSync(settings.partialsDir, hbs);
initHelpers.loadInitialData();
routes(app);

app.listen(settings.serverPort, () => {
    console.info(`Сервер запущен по адресу http://localhost:${settings.serverPort}/`);
});

module.exports = app;
