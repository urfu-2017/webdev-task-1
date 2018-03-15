const Article = require('../models/article');
const Widget = require('../models/widget');

exports.news = (req, res) => {
  const { query, category, country } = req.query;
  Promise.all([
    Widget.get(query),
    Article.get({ country, category }),
  ]).then(([widget, articles]) => {
    res.render('news', {
      ...res.locals,
      widget,
      articles,
      title: 'Новости',
    });
  }).catch(() => {
    res.sendStatus(500);
  });
};
