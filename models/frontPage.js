/* eslint-disable no-unused-vars */
'use strict';
const page = require('../mocks/front-info');

module.exports = class Front {
    static fetch() {
        return page;
    }
};
