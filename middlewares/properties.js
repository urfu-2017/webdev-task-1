import config from '../config';

export default (req, res, next) => {
    res.locals.properties = config.view;
    next();
};
