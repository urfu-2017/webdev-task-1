'use strict';

class weather {
    constructor(data) {
        // нелогичный класс
        this.weatherArr = data.consolidated_weather;
        this.city = data.title;
    }
}


module.exports = weather;
