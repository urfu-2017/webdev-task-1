'use strict';

const { main } = require('./controllers/main');
const { error404 } = require('./controllers/errors');
const { weatherByLoc, weatherByCoords } = require('./controllers/weather');

module.exports = app => {
    app.get('/', main);
    app.get('/weather/:query([a-z]+)', weatherByLoc);
    app.get('/weather/:lat([0-9]+):lon(([0-9]+))', weatherByCoords);
    app.all('*', error404);
};
