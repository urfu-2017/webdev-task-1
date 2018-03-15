'use strict';

const got = require('got');

module.exports = async (url, options = {}) => {
    options.json = true;

    return (await got(url, options)).body;
};
