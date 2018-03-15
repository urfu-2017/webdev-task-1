'use strict';

const MetaWeather = require('metaweather');
let mw = new MetaWeather();

module.exports = class Weather {
    static async getWeather(options) {
        const weatherData = await this.getWoeid(options);

        return this.buildWeatherData(weatherData);
    }
    static async getWoeid(options) {
        const weatherData = await this.buildWeatherBody(options);

        return mw.location(weatherData[0].woeid);
    }
    static buildWeatherBody(options) {
        if (options.lat && options.lon) {
            return mw.search().latLon(options.lat, options.lon)
                .then((response) => {
                    return response.body;
                });
        } else if (options.query) {
            return mw.search().query(options.query)
                .then((response) => {
                    return response.body;
                });

        }

        return mw.search().query('moscow')
            .then((response) => {
                return response.body;
            });
    }

    static buildWeatherData(weatherData) {
        let data = {};
        Object.assign(data, {
            info: weatherData.body.consolidated_weather,
            city: weatherData.body.title,
            img: weatherData.body.consolidated_weather[0].weather_state_abbr,
            temp: weatherData.body.consolidated_weather[0].the_temp,
            wind: weatherData.body.consolidated_weather[0].wind_speed,
            date: weatherData.body.consolidated_weather[0].applicable_date
        });

        return data;
    }
};
