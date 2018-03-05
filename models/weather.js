import fetch from 'node-fetch';

const BASE_URL = 'https://www.metaweather.com';

export default class WeatherAPI {
    static async getWeatherAsync({ query = 'Albuquerque', lat, lon }) {
        const locationResponse = await fetch((lat && lon)
            ? `${BASE_URL}/api/location/search/?lattlong=${lat},${lon}`
            : `${BASE_URL}/api/location/search/?query=${query}`);

        const locationJson = await locationResponse.json();
        const weatherResponse = await fetch(`${BASE_URL}/api/location/${locationJson[0].woeid}`);

        return await weatherResponse.json();
    }
}
