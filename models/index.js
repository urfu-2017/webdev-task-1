'use strict';

const api = require('../api');

module.exports = data => ({
    News: require('./news')(data, api),
    Weather: require('./weather')(data, api)
});
