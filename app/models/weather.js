'use strict';
const config = require('../../config');
const apiQuery = require('../models/api-query');
const { getDateString } = require('./date-formatter');
const filterNullParams = require('./filter-null-params');


const LOCATION_SEARCH_API = 'api/location/search/';
const WEATHER_API = 'api/location/';
const MS_TO_MPH_RATIO = 0.447;


const _getResponse = async ({ query = null, lattlong = null }) => {
    const queryObj = filterNullParams({ query, lattlong });
    const queryRes = await apiQuery(
        config.weatherApiDomain + LOCATION_SEARCH_API, queryObj);
    const woeid = queryRes[0].woeid;

    return await apiQuery(config.weatherApiDomain + WEATHER_API + woeid, {});
};


class DailyWeather {
    constructor(temperature, windSpeed, date, weatherStateAbbr) {
        this._temperature = temperature;
        this.windSpeed = windSpeed;
        this._date = date;
        this.weatherStateAbbr = weatherStateAbbr;
    }

    get tempSign() {
        if (this._temperature < 0) {
            return '-';
        }

        return this._temperature > 0 ? '+' : '';
    }

    get absTemperature() {
        return Math.abs(this._temperature);
    }

    get dateString() {
        return getDateString(this._date);
    }

    static fromApiResponse(apiResponseFragment) {
        const data = apiResponseFragment;

        return new DailyWeather(
            Math.round(data.the_temp),
            Math.round(data.wind_speed * MS_TO_MPH_RATIO),
            new Date(data.applicable_date),
            data.weather_state_abbr
        );
    }
}


class AggregatedWeatherData {
    constructor(location, dailyWeather) {
        this.location = location;
        this.today = dailyWeather[0];
        this.weatherChart = dailyWeather.splice(0);
    }

    static fromApiResponse(apiResponse) {
        return new AggregatedWeatherData(
            apiResponse.title,
            apiResponse.consolidated_weather
                .map(DailyWeather.fromApiResponse)
        );
    }
}


const _getWeather = async query =>
    AggregatedWeatherData.fromApiResponse(await _getResponse(query));


module.exports = _getWeather;
