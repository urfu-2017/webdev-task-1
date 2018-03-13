module.exports = (req, res, next) => {
  res.locals.meta = {
    charset: 'utf-8',
    description: 'Weather',
  };

  res.locals.staticBasePath = '/';

  res.locals.nonMain = req.path !== '/';

  res.locals.weatherApiBasePath = 'https://www.metaweather.com/';

  next();
};
