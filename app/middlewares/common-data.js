const { staticBasePath, weatherBasePath } = require('../../config');

module.exports = (req, res, next) => {
  res.locals.meta = {
    charset: 'utf-8',
    description: 'Weather',
  };

  res.locals.staticBasePath = staticBasePath;

  res.locals.nonMain = req.path !== staticBasePath;

  res.locals.weatherBasePath = weatherBasePath;

  next();
};
