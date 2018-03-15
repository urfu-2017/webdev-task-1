'use strict';

const fetch = require('node-fetch');
const querystring = require('querystring');

class WeatherFetcher {
    constructor() {
        this.apiUrl = 'https://www.metaweather.com/api/';
        this.locationUrl = 'location/search';
        this.weatherUrl = 'location';
    }

    async getWeather(query) {
        let weatherPromise;
        if (query.query) {
            weatherPromise = this.getWeatherByRegion(query.query);
        } else if (query.lat && query.lon) {
            weatherPromise = this.getWeatherByCoords({ lat: query.lat, lon: query.lon });
        } else {
            weatherPromise = this.getWeatherByRegion('moscow');
        }
        const weather = await weatherPromise;

        return weather;
    }

    async fetchWeather(regionId) {
        const id = Number(regionId);
        if (!id) {
            throw new Error('Неверный формат id');
        }
        const url = `${this.apiUrl}${this.weatherUrl}/${id}`;
        try {
            const res = await fetch(url);
            const data = await res.json();

            return data;
        } catch (ex) {
            console.error(ex);

            return { error: 'Не удалось подключиться к серверу погоды' };
        }
    }

    async getRegionId(url) {
        try {
            const res = await fetch(url);
            const data = await res.json();
            const regionId = data[0].woeid;

            return regionId;
        } catch (ex) {
            console.error(ex);

            return { error: 'Не удалось подключиться к серверу погоды' };
        }
    }

    async getWeatherByRegion(region) {
        const params = querystring.stringify({ query: region });
        const url = `${this.apiUrl}${this.locationUrl}?${params}`;
        const result = await this.getRegionId(url);
        if (result.error) {
            return result;
        }

        return this.fetchWeather(result);
    }

    async getWeatherByCoords({ lat, lon }) {
        const params = querystring.stringify({ lattlong: `${lat},${lon}` });
        const url = `${this.apiUrl}${this.locationUrl}?${params}`;
        const result = await this.getRegionId(url);
        if (result.error) {
            return result;
        }

        return this.fetchWeather(result);
    }
}

exports.weatherFetcher = new WeatherFetcher();
