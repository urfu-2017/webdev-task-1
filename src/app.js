'use strict';

const hbs = require('hbs');
const express = require('express');

const config = require('./config');
const routes = require('./routes');
const appHelpers = require('./utils/app-helpers');
const { errorHandler } = require('./middlewares/error-handler');

const app = express();
app.use(express.static(config.publicDir));
app.set('view engine', 'hbs');
app.set('views', config.viewsDir);
appHelpers.registerPartialsSync(config.partialsDir, hbs);
appHelpers.loadInitialData();
routes(app);
app.use(errorHandler);

const server = app.listen(config.serverPort, config.serverHost, () => {
    const { address, port } = server.address();
    console.info(`Сервер запущен по адресу http://${address}:${port}`);
});

process.once('SIGINT', async () => appHelpers.gracefulShutdown(server));
process.once('SIGTERM', async () => appHelpers.gracefulShutdown(server));
process.once('SIGUSR2', async () => appHelpers.gracefulShutdown(server));

module.exports = app;
