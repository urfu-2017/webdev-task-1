import WeatherAPI from '../models/weather';

import moment from 'moment';
import 'moment/locale/ru';

const dateFormat = (date) => moment(date).format('D MMMM');

export default async (req, res, next) => {
    try {
        const weatherResponse = await WeatherAPI.getWeatherAsync(req.query);
        const currentDay = weatherResponse.consolidated_weather.shift();

        const summary = {
            state: currentDay.weather_state_abbr,
            city: weatherResponse.title,
            temp: currentDay.the_temp.toFixed(),
            wind: currentDay.wind_speed.toFixed(),
            date: dateFormat(currentDay.applicable_date)
        };

        const days = weatherResponse.consolidated_weather.map(day => ({
            temp: day.the_temp.toFixed(),
            wind: day.wind_speed.toFixed(),
            date: dateFormat(day.applicable_date)
        }));

        res.locals.weather = { summary, days };
    } finally {
        next();
    }
};
