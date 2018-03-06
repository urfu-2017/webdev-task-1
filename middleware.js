'use strict';

const express = require('express');
const weatherMiddleware = require('./middlewares/weather');
const queriesMiddleware = require('./middlewares/queries');
const propertiesMiddleware = require('./middlewares/properties');

module.exports = (app) => {
    app.use(express.static(`${__dirname}/public`));
    app.use(propertiesMiddleware);
    app.use(queriesMiddleware);
    app.use(weatherMiddleware);
};
