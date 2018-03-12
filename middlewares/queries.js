import querystring from 'querystring';

export default (req, res, next) => {
    res.locals.queries = querystring.stringify(req.query);
    next();
};
