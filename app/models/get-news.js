'use strict';

const fetch = require('node-fetch');
const querystring = require('querystring');

const API_ENDPOINT = {
    protocol: 'https',
    host: 'newsapi.org',
    basePath: '/v2',
    headlinesPath: '/top-headlines'
};

async function fetchEndpoint(url) {
    try {
        const response = await fetch(url);

        return await response.json();
    } catch (e) {
        console.error(e);

        return null;
    }
}

async function fetchNewsEndpoint({ country, category, apiKey }) {
    const params = querystring.stringify({ country, category, apiKey });
    const url = `${API_ENDPOINT.protocol}://${API_ENDPOINT.host}` +
        `${API_ENDPOINT.basePath}${API_ENDPOINT.headlinesPath}?${params}`;

    return fetchEndpoint(url);
}

module.exports = async (country, category, apiKey) => {
    if (!country) {
        country = 'us';
    }

    return await fetchNewsEndpoint({ country, category, apiKey });
};
