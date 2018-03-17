'use strict';

class WeatherInfo {
    constructor(abbr, t, windMpH, date) {
        this.abbr = abbr;
        this.t = t.toFixed(1);
        this.windMpH = windMpH.toFixed(2);
        this.date = date;
        this.windKmpH = this.windKmpH();
    }

    windKmpH() {
        return (this.windMpH / 1.6).toFixed(1);
    }
}

module.exports = WeatherInfo;
