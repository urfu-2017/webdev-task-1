'use strict';


module.exports = class WeatherForecast {
    /* eslint-disable camelcase */
    constructor({ the_temp, wind_speed, weather_state, applicable_date }) {
        this.temperature = the_temp;
        this.windSpeed = wind_speed;
        this.weatherState = weather_state;
        this.date = applicable_date;
    }
    /* eslint-enable */
};
