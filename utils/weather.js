'use strict';

const fetch = require('node-fetch');

const apiUrl = 'https://www.metaweather.com/api/';
const locationUrl = 'location/search';
const weatherUrl = 'location';

async function getWeather(regionId) {
    const id = Number(regionId);
    if (!id) {
        throw new Error('Неверный формат id');
    }
    const url = `${apiUrl}${weatherUrl}/${id}`;
    try {
        const res = await fetch(url);
        const data = await res.json();

        return data;
    } catch (ex) {
        console.error(ex);

        return { error: 'Не удалось подключиться к серверу погоды' };
    }
}

async function getRegionId(url) {
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

async function getWeatherByRegion(region) {
    const url = `${apiUrl}${locationUrl}?query=${region}`;
    const result = await getRegionId(url);
    if (result.error) {
        return result;
    }

    return getWeather(result);
}

async function getWeatherByCoords({ lat, lon }) {
    const url = `${apiUrl}${locationUrl}?lattlong=${lat},${lon}`;
    const result = await getRegionId(url);
    if (result.error) {
        return result;
    }

    return getWeather(result);
}

exports.getWeatherByCoords = getWeatherByCoords;
exports.getWeatherByRegion = getWeatherByRegion;
