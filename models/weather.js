'use strict';

class Weather {
    constructor({ title, lattLong, consolidatedWeather }) {
        this.title = title;
        this.lattLong = lattLong;
        this.dataPerDay = consolidatedWeather;
    }
}

module.exports = Weather;
