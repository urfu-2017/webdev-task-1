'use strict';

class Weather {
    constructor({ location, date, temp, state, windSpeed }) {
        this.location = location;
        this.date = date;
        this.temp = temp;
        this.state = state;
        this.windSpeed = windSpeed;
    }
}

module.exports = Weather;
