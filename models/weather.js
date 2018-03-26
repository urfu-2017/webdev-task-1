/* eslint max-params: ["error", 5]*/
'use strict';

class Forecast {
    constructor(town, date, temp, weatherPic, windSpeed) {
        this.town = town;
        this.date = date;
        this.temp = Math.floor(temp);
        this.weatherPic = weatherPic;
        this.windSpeed = Math.floor(windSpeed);
    }
}

module.exports = Forecast;
