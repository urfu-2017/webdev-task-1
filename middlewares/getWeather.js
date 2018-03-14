/* eslint-disable indent,no-trailing-spaces */
'use strict';
const MetaWeather = require('metaweather');
let mw = new MetaWeather();
let weather = '';
module.exports = async (req, res, next)=> {
    let lattlong = req.query.lattlong;
    let query = req.query.query;
        if (query) {
            await mw.search().query(query)
                .then(async (response) =>{

                    await (mw.location(response.body[0].woeid))
                        .then((response1)=> {
                            weather = response1.body;
                        });
                });


        } else if (lattlong) {
            await mw.search().latLon(lattlong)
                .then(async (response) =>{

                    await (mw.location(response.body[0].woeid))
                        .then((response1)=> {
                            weather = response1.body;
                        });
                });


        }
        Object.assign(res.locals, {
            info: weather.consolidated_weather,
            city: weather.title,
            img: weather.consolidated_weather[0].weather_state_abbr,
            temp: weather.consolidated_weather[0].the_temp,
            wind: weather.consolidated_weather[0].wind_speed,
            date: weather.consolidated_weather[0].applicable_date
        });

        next();
    };
