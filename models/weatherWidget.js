'use strict';

const config = require('../config/default');
const moment = require('moment');

moment.locale('ru');

class Widget {
    constructor(weatherObj) {
        /* eslint camelcase: 0 */
        let weatherList = weatherObj.consolidated_weather;

        weatherList.forEach(oneDayWeather => {
            oneDayWeather.the_temp = Math.round(oneDayWeather.the_temp);
            oneDayWeather.wind_speed = Math.round(oneDayWeather.wind_speed);
            oneDayWeather.applicable_date = moment(oneDayWeather.applicable_date).format('D MMMM');
        });

        this.title = weatherObj.title;
        this.weatherList = weatherList;
        let svgFileName = this.weatherList[0].weather_state_abbr;
        this.currentTemp = Math.round(this.weatherList[0].the_temp);
        this.currentWind = Math.round(this.weatherList[0].wind_speed);
        this.imageUrl = `${config.weatherImageBaseUrl}/${svgFileName}.svg`;
    }
}

module.exports = Widget;
