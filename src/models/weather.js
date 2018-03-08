'use strict';

const requests = require('../utils/requests');

const apiLocationUrl = 'https://www.metaweather.com/api/location/search/';
const apiForecastUrl = 'https://www.metaweather.com/api/location/';
const stateIconUrl = (state) => `https://www.metaweather.com/static/img/weather/${state}.svg`;

class Weather {
    // woeid - Where On Earth ID
    static async getWoeid(queryArgs) {
        let requestUrl;
        if (queryArgs.query) {
            requestUrl = `${apiLocationUrl}?query=${queryArgs.query}`;
        } else if (queryArgs.lat && queryArgs.lon) {
            requestUrl = `${apiLocationUrl}?lattlong=${[queryArgs.lat, queryArgs.lon].join(',')}`;
        } else {
            throw new Error('Не указаны аргументы для корректного определения местоположения');
        }

        const response = await requests.jsonRequest(requestUrl);

        if (response.status !== 200) {
            throw new Error('Сервис погоды отдал некорректный ответ');
        }

        if (response.body.length === 0) {
            throw new Error('Некорректный геолокационный запрос');
        }

        return response.body[0].woeid;
    }

    static async getLocationWeather(woeid) {
        const requestUrl = `${apiForecastUrl}${woeid}/`;
        const response = await requests.jsonRequest(requestUrl);

        if (response.status !== 200) {
            throw new Error('Сервис погоды отдал некорректный ответ');
        }

        return response.body;
    }

    static prepareToView(weather) {
        const preparedData = {};

        for (const forecast of weather.consolidated_weather) {
            forecast.temperature = Math.round(forecast.the_temp);
            forecast.windSpeed = Math.round(forecast.wind_speed);
            forecast.icon = stateIconUrl(forecast.weather_state_abbr);
            forecast.stateAltName = forecast.weather_state_name;
            forecast.date = forecast.applicable_date;
        }

        preparedData.city = weather.title;
        preparedData.today = weather.consolidated_weather[0];
        preparedData.forecasts = weather.consolidated_weather;

        return preparedData;
    }

    static async filter(queryArgs = { query: '', lat: '', lon: '' }) {
        const woeid = await this.getWoeid(queryArgs);
        const locationWeather = await this.getLocationWeather(woeid);

        return this.prepareToView(locationWeather);
    }
}

module.exports = Weather;
