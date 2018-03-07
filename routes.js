const categories = require('./controllers/categories');
const news = require('./controllers/news');

module.exports = app => {
    app.get('/', categories.list);
    app.get('/news/:category([a-z]+)', news.index);
}