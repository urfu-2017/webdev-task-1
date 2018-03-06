import WeatherAPI from '../models/weather';
import moment from 'moment';
import 'moment/locale/ru';

const dateFormat = (date) => moment(date).format('D MMMM');

export default async (req, res, next) => {
    try {
        const weatherResponse = await WeatherAPI.getWeatherAsync(req.query);
        const [current, ...otherDays] = weatherResponse.consolidated_weather;

        const summary = {
            state: current.weather_state_abbr,
            city: weatherResponse.title,
            temp: current.the_temp.toFixed(),
            wind: current.wind_speed.toFixed(),
            date: dateFormat(current.applicable_date)
        };

        const days = otherDays.map(day => ({
            temp: day.the_temp.toFixed(),
            wind: day.wind_speed.toFixed(),
            date: dateFormat(day.applicable_date)
        }));

        res.locals.weather = { summary, days };
    } finally {
        next();
    }
};
