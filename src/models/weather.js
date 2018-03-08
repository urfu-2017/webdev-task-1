'use strict';

const requests = require('../utils/requests');

const apiLocationUrl = 'https://www.metaweather.com/api/location/search/';
const apiForecastUrl = 'https://www.metaweather.com/api/location/';

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

    static async getForecast(woeid) {
        const requestUrl = `${apiForecastUrl}${woeid}/`;
        const response = await requests.jsonRequest(requestUrl);

        if (response.status !== 200) {
            throw new Error('Сервис погоды отдал некорректный ответ');
        }

        return response.body;
    }

    static async filter(queryArgs = { query: '', lat: '', lon: '' }) {
        const woeid = await this.getWoeid(queryArgs);
        const forecast = await this.getForecast(woeid);

        return forecast;
    }
}

module.exports = Weather;
