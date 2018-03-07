/* eslint-disable max-statements */
'use strict';
let MetaWeather = require('metaweather');
let mw = new MetaWeather();
global.weather = '';
module.exports = async (req, res, next)=> {
    global.lattlong = req.query.lattlong;
    global.query = req.query.query;
    console.info(global.query);
    // console.info(global.lattlong);

    try {
        if (global.query) {
            await mw.search().query(global.query)
                .then(async (response) =>{
                    // console.info(global.query);

                    await (mw.location(response.body[0].woeid))
                        .then((response1)=> {
                            global.weather = response1.body;
                            // console.info(global.weather);
                        });
                });


        } else if (global.lattlong) {
            await mw.search().latLon(global.lattlong)
                .then(async (response) =>{
                    // console.info(global.lattlong);

                    await (mw.location(response.body[0].woeid))
                        .then((response1)=> {
                            global.weather = response1.body;
                            // console.info(global.weather);
                        });
                });


        }
        console.info(global.query);
        res.locals.info = global.weather.consolidated_weather;
        res.locals.city = global.weather.title;
        res.locals.img = res.locals.info[0].weather_state_abbr;
        res.locals.temp = res.locals.info[0].the_temp;
        res.locals.wind = res.locals.info[0].wind_speed;
        res.locals.date = res.locals.info[0].applicable_date;
    } finally {
        next();
    }
};
