'use strict';
const request = require('request-promise');
const escape = require('escape-html');


module.exports = async (uri, query) => {
    const options = {
        uri: uri,
        method: 'GET',
        qs: query,
        json: true
    };
    const response = await request(options);
    for (let [prop, value] of Object.entries(response)) {
        if (typeof value === 'string') {
            response[prop] = escape(value);
        }
    }

    return response;
};
