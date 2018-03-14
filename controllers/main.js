'use strict';


exports.main = async (req, res) => {
    req.locals.pageName = 'main';

    res.render('home', req.locals);
};
