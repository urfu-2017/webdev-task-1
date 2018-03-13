const axios = require('axios');
const cities = require('all-the-cities');
const moment = require('moment');

const config = require('../../config/localhost');

const apiBasePath = `${config.weatherApiBasePath}api/location/`;

class WeatherWidget {
  constructor({ title, countryCode, forecast }) {
    this.countryCode = countryCode;
    this.city = title;
    this.currentDayTemp = forecast[0].temperature;
    this.currentDayWind = forecast[0].wind;
    this.currentDayWeatherType = forecast[0].weatherType;
    forecast.shift();
    this.weatherForecast = forecast;
  }

  static get(cityName) {
    if (!cityName) {
      // eslint-disable-next-line no-param-reassign
      cityName = config.defaultCity;
    }
    return axios.get(`${apiBasePath}search/`, { params: { query: cityName } })
      .then(response => response.data[0].woeid)
      .then(woeid => axios.get(apiBasePath + woeid))
      .then(response => response.data)
      .then(weatherReport => new WeatherWidget(WeatherWidget.format(weatherReport)));
  }

  static format(weatherReport) {
    return {
      title: weatherReport.title,
      countryCode: cities.filter(city => city.name.match(weatherReport.title))[0]
        .country.toLowerCase(),
      forecast:
        weatherReport.consolidated_weather.map((report) => {
          const date = moment(report.applicable_date);
          date.locale('ru');
          let temperature = parseInt(report.the_temp, 10);
          if (temperature > 0) {
            temperature = `+${temperature}`;
          }

          return {
            date: date.format('LL').slice(0, -7),
            wind: parseInt(report.wind_speed, 10),
            temperature,
            weatherType: report.weather_state_abbr,
          };
        }),
    };
  }
}


module.exports = WeatherWidget;
