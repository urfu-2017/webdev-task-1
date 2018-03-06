'use strict';

const { getBodyByUrl } = require('./commonRepository');

const apiString = 'https://www.metaweather.com/api/location/44418/';
// primer https://www.metaweather.com/api/location/44418/

exports.getWeatherData = () => {

    return getBodyByUrl(apiString)
        .then(
            body => {
                return body;
            }
        );
};
