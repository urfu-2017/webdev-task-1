'use strict';
const fetch = require('node-fetch');
const apiBaseUrl = 'https://www.metaweather.com';
const defaultQuery = require('./weather-config.json').defaultQuery;
const locationSearchPathName = '/api/location/search/';
const windIcon = 'images/wind.png';
const meterInMile = 1609.34;
const dateRegExp = /\d+-(\d+)-(\d+)/;

const monthesStrings = ['января', 'февраля', 'марта',
    'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября',
    'октября', 'ноября', 'декабря'];

const compareByDistance = (a, b) => {
    if (a.distance > b.distance) {
        return 1;
    }
    if (a.distance < b.distance) {
        return -1;
    }

    return 0;
};

class WeatherWidget {

    async _resolver(query) {
        let locationSearch = apiBaseUrl + locationSearchPathName + query;
        let res = await fetch(locationSearch);
        let result = await res.json();
        if (result.length === 0) {
            return await this._resolver(defaultQuery);
        }
        if (result[0].distance !== undefined) {
            result.sort(compareByDistance);
        }
        let location = result[0];

        return location.woeid;
    }

    async _getWoeid(request) {
        let result;
        let query = request.query;
        if (query.lat !== undefined && query.lon !== undefined) {
            result = await this._resolver(`?lattlong=${query.lat},${query.lon}`);

            return result;
        }
        if (query.query !== undefined) {
            result = await this._resolver(`?query=${query.query}`);

            return result;
        }
        result = await this._resolver(defaultQuery);

        return result;
    }

    async _getWeatherByWoeid(woeid) {
        let location = apiBaseUrl + `/api/location/${woeid}`;
        let res = await fetch(location);
        let result = await res.json();

        return result;
    }

    _mphToMeterPerSeconds(mph) {
        return mph * meterInMile / 3600;
    }

    _applicableToReadableDate(dateString) {
        let parsedDate = dateRegExp.exec(dateString);
        let month = parsedDate[1];
        let day = parsedDate[2];

        return `${day} ${monthesStrings[month - 1]}`;
    }

    _prepareNextDays(consolidatedWeather) {
        return consolidatedWeather
            .slice(1)
            .map((weather) => (
                {
                    date: this._applicableToReadableDate(weather.applicable_date),
                    temperature: Math.round(weather.the_temp),
                    windSpeed: Math.round(this._mphToMeterPerSeconds(weather.wind_speed))
                }
            ));
    }

    async getWeather(request) {
        let woeid = await this._getWoeid(request);
        let weather = await this._getWeatherByWoeid(woeid);
        let nowWeather = weather.consolidated_weather[0];
        let weatherStateIcon = apiBaseUrl +
            `/static/img/weather/${nowWeather.weather_state_abbr}.svg`;

        return {
            city: weather.title,
            weatherStateIcon,
            weatherStateAlt: nowWeather.weather_state_name,
            temperature: Math.round(nowWeather.the_temp),
            windSpeed: Math.round(this._mphToMeterPerSeconds(nowWeather.wind_speed)),
            windIcon,
            windAlt: 'Wind, m/s',
            temperatureMeasure: '&#8451;',
            windSpeedMeasure: 'м/c',
            nextDays: this._prepareNextDays(weather.consolidated_weather)
        };
    }

}

module.exports.WeatherWidget = WeatherWidget;
