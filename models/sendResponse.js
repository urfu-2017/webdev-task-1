'use strict';

const request = require('request-promise-native');

module.exports.getResponse = url => {
    return request(url)
        .then(response => JSON.parse(response))
        .catch(err => err);
};
