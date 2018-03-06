import config from '../config';

module.exports = (req, res, next) => {
    res.locals.properties = config.view;
    next();
};
