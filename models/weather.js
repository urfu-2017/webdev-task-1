'use strict';

import MetaWeather from 'metaweather';
import config from '../config';

const metaweather = new MetaWeather();

class WeatherManager {
    static async getWeatherData({ query, lat, lon }) {
        let response;
        if (!(lat && lon || query)) {
            query = config.country;
        }
        if (query) {
            response = await metaweather.search().query(query);
        } else {
            response = await metaweather.search().latLon(`${lat},${lon}`);
        }
        let woeid = response.body[0].woeid;
        let locationResponse = await metaweather.location(woeid);
        let weatherData = locationResponse.body;

        let preparedConsolidatedWeather = weatherData.consolidated_weather.map((cw) => {
            return {
                iconState: cw.weather_state_abbr,
                temperature: cw.the_temp.toFixed(0),
                windSpeed: cw.wind_speed.toFixed(0),
                date: cw.applicable_date
            };
        });
        return {
            title: weatherData.title,
            current: preparedConsolidatedWeather[0],
            fiveDays: preparedConsolidatedWeather.slice(1)
        };
    }
}

exports.WeatherManager = WeatherManager;
