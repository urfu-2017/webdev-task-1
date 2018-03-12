'use strict';
const MetaWeather = require('metaweather');
const mw = new MetaWeather();

const DEFAULT_CITY = 'Moscow';

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

class Location {
    static getAsync(params) {
        const { query, lat, lon } = params;
        if (typeof query === 'string') {
            return mw.search().query(query);
        } else if (isNumeric(lat) && isNumeric(lon)) {
            return mw.search().latLon({ lat, lon });
        }

        return mw.search().query(DEFAULT_CITY);

    }
}

module.exports = Location;
