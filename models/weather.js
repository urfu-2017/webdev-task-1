'use strict';

const MetaWeather = require('metaweather');
const metaweather = new MetaWeather();

class WeatherManager {
    static async getWeatherData({ query, lat, lon }) {
        let response;
        if (query) {
            response = await metaweather.search().query(query);
        } else {
            response = await metaweather.search().latLon(`${lat},${lon}`);
        }
        let woeid = response.body[0].woeid;
        let locationResponse = await metaweather.location(woeid);

        return locationResponse.body;
    }
}

exports.WeatherManager = WeatherManager;
