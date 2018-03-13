const config = require('../../config/localhost');

module.exports = (req, res, next) => {
  res.locals.meta = {
    charset: 'utf-8',
    description: 'Weather',
  };

  res.locals.staticBasePath = config.staticBasePath;

  res.locals.nonMain = req.path !== config.staticBasePath;

  res.locals.weatherApiBasePath = config.weatherApiBasePath;

  next();
};
