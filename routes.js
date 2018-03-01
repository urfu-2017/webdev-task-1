'use strict';

const { getPage: info } = require('./controllers/info');

module.exports = app => {
    app.get('/', info);
};
