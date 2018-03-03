'use strict';

const baseUrl = 'https://www.metaweather.com';

class Widget {
    constructor(weatherObj) {
        /* eslint camelcase: 0 */
        let weatherList = weatherObj.consolidated_weather;
        weatherList.forEach(o => {
            o.the_temp = Math.round(o.the_temp);
            o.wind_speed = Math.round(o.wind_speed);
        });
        this.title = weatherObj.title;
        this.weatherList = weatherList;
        let svgFileName = this.weatherList[0].weather_state_abbr;
        this.currentTemp = Math.round(this.weatherList[0].the_temp);
        this.currentWind = Math.round(this.weatherList[0].wind_speed);
        this.imageUrl = `${baseUrl}/static/img/weather/${svgFileName}.svg`;
    }
}

exports.Widget = Widget;
