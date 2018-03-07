'use strict';

class weather {
    constructor(data) {
        var weatherArr = data.consolidated_weather;
        var forecast = [];
        var abbreviation = weatherArr[0].weather_state_abbr;
        this.imgSrc = 'https://www.metaweather.com/static/img/weather/' + abbreviation + '.svg';
        this.city = data.title;
        this.weather = weatherArr[0].the_temp.toFixed(1);
        this.wind = weatherArr[0].wind_speed.toFixed(1);
        weatherArr.forEach(elem => {
            forecast.push({
                weather: elem.the_temp.toFixed(1),
                wind: elem.wind_speed.toFixed(1),
                date: getRusTime(elem.applicable_date)
            });
        });
        this.daily = forecast.slice(0, 5);

    }

}

function getRusTime(time) {
    var timeObject = new Date(time);
    var months = ['Январь', 'Февраль', 'Марта', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август',
        'Сентябрь', 'Ноябрь', 'Декабрь'];

    return timeObject.getDate() + ' ' + months[timeObject.getMonth()];
}

module.exports = weather;
