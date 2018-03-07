const models = require('../models/news');
const data = require('../data'); 

exports.index = (req, res) => {
    models.NewsManager.findByCategory(req.params.category).then((apiResponse) => {
        res.render('news', {
            title: data.categories[req.params.category].title,
            articles: apiResponse.articles,
            dateOptions: {
                lang: "ru"
            }
        });
    })
}