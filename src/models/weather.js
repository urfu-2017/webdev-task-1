'use strict';

const moment = require('moment');
const config = require('../config');
const messages = require('../data/messages');
const requests = require('../utils/requests');
const exceptions = require('../utils/exceptions');

const apiForecastUrl = `${config.weatherBaseUrl}api/location/`;
const apiLocationUrl = `${config.weatherBaseUrl}api/location/search/`;
const stateIconUrl = (state) => `${config.weatherBaseUrl}static/img/weather/${state}.svg`;

class Weather {
    static async get(queryArgs) {
        const woeid = await this._getWoeid(queryArgs);
        const locationWeather = await this._getLocationWeather(woeid);

        return this._prepareToView(locationWeather);
    }

    // woeid - Where On Earth ID
    static async _getWoeid(queryArgs) {
        let requestUrl;
        if (queryArgs.lat && queryArgs.lon) {
            requestUrl = `${apiLocationUrl}?lattlong=${queryArgs.lat},${queryArgs.lon}}`;
        } else {
            requestUrl = `${apiLocationUrl}?query=${queryArgs.query || config.weatherDefaultQuery}`;
        }

        const response = await requests.jsonRequest(requestUrl);

        if (response.status !== 200) {
            throw new exceptions.HttpError(messages.remoteServerError, response.status);
        }

        if (response.body.length === 0) {
            throw new exceptions.BadRequest(messages.wrongGeolocation);
        }

        return response.body[0].woeid;
    }

    static async _getLocationWeather(woeid) {
        const requestUrl = `${apiForecastUrl}${woeid}/`;
        const response = await requests.jsonRequest(requestUrl);

        if (response.status !== 200) {
            throw new exceptions.HttpError(messages.remoteServerError, response.status);
        }

        return response.body;
    }

    static _prepareToView(weather) {
        const viewForecasts = weather.consolidated_weather.map(forecast => ({
            temperature: Math.round(forecast.the_temp),
            windSpeed: Math.round(forecast.wind_speed),
            icon: stateIconUrl(forecast.weather_state_abbr),
            stateAltName: forecast.weather_state_name,
            date: moment(forecast.applicable_date)
                .locale('ru')
                .format('DD MMMM')
        }));

        return {
            city: weather.title,
            today: viewForecasts[0],
            forecasts: viewForecasts
        };
    }
}

module.exports = Weather;
