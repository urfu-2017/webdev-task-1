const numberMonth = require('./numberMonth');

class OneOfNextDay {
    constructor(oneDay) {
        this.temperature = Math.round(oneDay.the_temp);
        this.wind = Math.round(oneDay.wind_speed);

        let today = new Date(oneDay.applicable_date);
        this.day = today.getUTCDate();
        this.month = numberMonth(today.getUTCMonth());
    }
}

class Widget {
    constructor(weather) {
        this.city = weather.title;

        let stateAbbr = weather.consolidated_weather[0].weather_state_abbr;
        this.stateUrl = `https://www.metaweather.com/static/img/weather/${stateAbbr}.svg`;

        this.temperature = Math.round(weather.consolidated_weather[0].the_temp);
        this.wind = Math.round(weather.consolidated_weather[0].wind_speed);

        let today = new Date(weather.time);
        this.day = today.getUTCDate();
        this.month = numberMonth(today.getUTCMonth());

        let arrNextDays = weather.consolidated_weather;
        arrNextDays.shift();
        this.next5Days = arrNextDays.map((item) => new OneOfNextDay(item));
    }
}

module.exports = Widget;


