'use strict';

const rp = require('request-promise');
const { isUndefined } = require('util');

module.exports.getWeather = async (req) => {
    if (isUndefined(req.query.query) &&
        (isUndefined(req.query.lat) || isUndefined(req.query.lon))) {
        req.query.query = 'moscow';
    }
    if (isUndefined(req.query.country)) {
        req.query.country = 'ru';
    }
    const endOfUrl = isUndefined(req.query.query)
        ? `lattlong=${req.query.lat},${req.query.lon}` : `query=${req.query.query}`;
    const options = {
        method: 'GET',
        url: `https://www.metaweather.com/api/location/search/?${endOfUrl}`,
        json: true
    };
    const subOptions = await rp(options)
        .then(function (response) {

            return {
                method: 'GET',
                url: 'https://www.metaweather.com/api/location/' + response[0].woeid,
                json: true
            };
        });
    const dataWeather = await rp(subOptions).then(function (subResponse) {
        subResponse.consolidated_weather.forEach(element => {
            /* eslint-disable */
            element.the_temp = Math.round(element.the_temp) + ' °C';
            element.wind_speed = Math.round(element.wind_speed) + ' m/c';
            element.applicable_date = element.applicable_date.slice(5);
            /* eslint-enable */
        });

        return subResponse;
    });

    return {
        endOfUrl: endOfUrl + '&country=' + req.query.country,
        cityName: dataWeather.title,
        today: dataWeather.consolidated_weather[0],
        forecasts: dataWeather.consolidated_weather
    };
};
