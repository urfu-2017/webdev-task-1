'use strict';


exports.handleMainPage = async (req, res) => {
    req.locals.pageName = 'main';
    req.locals.weather = await req.locals.weather;

    res.render('home', req.locals);
};
