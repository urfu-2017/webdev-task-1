'use strict';

const rp = require('request-promise');
const { URL } = require('url');

const API_KEY = 'e16a8489b56441648aa91419cd3e1350';
const ABBR_DEFAULT_COUNTRY = 'ru';
const { ERROR_PACKET, OPTIONS_OF_GET_REQUEST } = require('./common_settings');

module.exports.getNews = req => {
    const url = new URL('https://newsapi.org/v2/top-headlines?');
    if (req.query.country) {
        url.searchParams.append('country', req.query.country);
    } else {
        url.searchParams.append('country', ABBR_DEFAULT_COUNTRY);
    }
    url.searchParams.append('category', req.params.category);
    url.searchParams.append('apiKey', API_KEY);
    const options = Object.assign({ url }, OPTIONS_OF_GET_REQUEST);

    return rp(options)
        .catch(() => {
            return {
                metaNews: ERROR_PACKET
            };
        });
};
