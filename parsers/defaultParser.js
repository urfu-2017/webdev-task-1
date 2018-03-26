'use strict';

const { format } = require('url');

const dotenv = require('dotenv');
const request = require('request-promise-native');

const defaultValues = dotenv.config('../.env').parsed;

function setUrl(host, pathname, params) {
    const url = format({
        protocol: defaultValues.PROTOCOL,
        host,
        pathname,
        query: params
    });

    return url;
}

function getResponse(url) {
    return request(url)
        .then(response => JSON.parse(response))
        .catch(err => err);
}

module.exports.setUrl = setUrl;
module.exports.getResponse = getResponse;
