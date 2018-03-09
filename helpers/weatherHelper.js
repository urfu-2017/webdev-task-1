'use strict';

const DEFAULT_QUERY = '?query=moscow';

class WeatherHelper {
    static getQueryForLocation(sourceQuery) {
        if (sourceQuery.query) {
            return `?query=${sourceQuery.query}`;
        }

        if (sourceQuery.lattlong) {
            return `?lattlong=${sourceQuery.lattlong}`;
        }

        return DEFAULT_QUERY;
    }

    static getWeatherInfoForFiveDays(consolidatedWeatherInfos) {
        return consolidatedWeatherInfos
            .slice(0, 5)
            .map(day => ({
                date: new Date(day.applicable_date).toDateString(),
                windSpeed: Math.round(day.wind_speed),
                state: day.weather_state_abbr,
                temp: Math.abs(Math.round(day.the_temp)),
                isPlus: day.the_temp > 0
            }));
    }
}

module.exports = WeatherHelper;
