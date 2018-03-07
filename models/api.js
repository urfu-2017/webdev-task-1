'use strict';

const got = require('got');
const { apiKey } = require('../data.json');

module.exports.getWoeid = ({ query, lat, lon }) => {
    if (query) {
        return got(
            'https://www.metaweather.com/api/location/search/',
            { query: `query=${query}` }
        );
    }
    if (lat && lon) {
        return got(
            'https://www.metaweather.com/api/location/search/',
            { query: `lattlon=${lat},${lon}` }
        );
    }

    return got(
        'https://www.metaweather.com/api/location/search/',
        {
            query: { query: 'london' }
        }
    );
};

module.exports.getWeather = woeid => {
    return got('https://www.metaweather.com/api/location/' + woeid);
};

module.exports.getNews = (country, category) => {
    return got(
        'https://newsapi.org/v2/top-headlines',
        {
            query: {
                country,
                category,
                apiKey
            }
        }
    );
};
