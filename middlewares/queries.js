export default (req, res, next) => {
    res.locals.queries = Object.keys(req.query)
        .reduce((prev, cur) => `${prev && `${prev}&`}${cur}=${req.query[cur]}`, '');

    next();
};
