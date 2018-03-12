/* eslint-disable max-statements */
'use strict';
let MetaWeather = require('metaweather');
let mw = new MetaWeather();
let weather = '';
module.exports = async (req, res, next)=> {
    let lattlong = req.query.lattlong;
    let query = req.query.query;
    try {
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
        res.locals.info = weather.consolidated_weather;
        res.locals.city = weather.title;
        res.locals.img = res.locals.info[0].weather_state_abbr;
        res.locals.temp = res.locals.info[0].the_temp;
        res.locals.wind = res.locals.info[0].wind_speed;
        res.locals.date = res.locals.info[0].applicable_date;
    } finally {
        next();
    }
};
