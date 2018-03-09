const { getInfo, news } = require('./controllers/news');

module.exports = app => {
    app.get('/', getInfo);
    app.get('/:name', news);
};
