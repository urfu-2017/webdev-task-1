const Widget = require('../models/widget');
const Category = require('../models/category');

exports.mainPage = (req, res) => {
  Promise.all([
    Widget.get(req.query.query),
    Category.get(req.query.country),
  ]).then(([widget, categories]) => {
    res.render('index', {
      ...res.locals, widget, categories, ...{ title: 'Погода' },
    });
  }).catch((err) => {
    res.redirect('error', err);
  });
};
