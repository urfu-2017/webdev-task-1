/* eslint-disable no-unused-vars */
'use strict';
const fetch = require('node-fetch');

module.exports = class FrontPage {
    fetch() {
        return require('../mocks/front-info');
    }
};
