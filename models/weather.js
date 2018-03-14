'use strict';

const rp = require('request-promise');

const config = require('../config.json');


class Weather {
    static async fetch(query) {
        let weather = await Weather._sendRequestForWeather(query);
        if (!('status' in weather) || weather.status === config.pageStatuses.OK) {
            weather = Weather._parseWeatherFromWoeidResponse(weather);
        }

        return weather;
    }

    static _sendRequestForWeather(query) {
        const urlForPlaceOptions = {
            uri: config.weatherUrlForPlace,
            qs: {}
        };
        if (query.query) {
            urlForPlaceOptions.qs.query = query.query;
        } else if (query.lat !== undefined && query.lon !== undefined) {
            urlForPlaceOptions.qs.lattlong = `${query.lat},${query.lon}`;
        } else {
            urlForPlaceOptions.qs.query = config.defaultCity;
        }
        Object.assign(urlForPlaceOptions, config.getRequestOptions);

        return rp(urlForPlaceOptions)
            .then(resForPlace => {
                if (!Object.keys(resForPlace).length) {
                    return { status: config.pageStatuses.INVALID_DATA };
                }
                const urlForWoeidOptions = {
                    uri: `${config.weatherUrlForWoeid}/${resForPlace[0].woeid}`
                };
                Object.assign(urlForWoeidOptions, config.getRequestOptions);

                return rp(urlForWoeidOptions)
                    .catch(() => ({ status: config.pageStatuses.ERROR }));
            })
            .catch(() => ({ status: config.pageStatuses.ERROR }));
    }

    static _parseWeatherFromWoeidResponse(woeidResponse) {
        const currentDay = woeidResponse.consolidated_weather[0];
        const nextDays = woeidResponse.consolidated_weather.slice(1);

        return {
            status: config.pageStatuses.OK,
            locationName: woeidResponse.title,
            urlToWeatherPicture:
                `${config.weatherUrlForImage}/${currentDay.weather_state_abbr}.svg`,
            currentTemperature: Math.round(currentDay.the_temp),
            currentWind: Math.round(currentDay.wind_speed),
            nextWeather: nextDays.map(day => ({
                date: new Date(day.applicable_date)
                    .toLocaleString('en', config.dateFormatOptions),
                temperature: Math.round(day.the_temp),
                wind: Math.round(day.wind_speed)
            }))
        };
    }
}

module.exports = Weather;
