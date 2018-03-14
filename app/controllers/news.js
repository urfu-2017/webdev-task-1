const Article = require('../models/article');
const Widget = require('../models/widget');

exports.news = (req, res) => {
  Promise.all([
    Widget.get(req.query.query),
    Article.get(req.query),
  ]).then(([widget, articles]) => {
    res.render('news', {
      ...res.locals, widget, articles, ...{ title: 'Новости' },
    });
  }).catch((err) => {
    res.redirect('error', err);
  });
};
