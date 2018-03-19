module.exports = app => {
    app
        .get('/:category([a-z]+)', (req, res) => {
            res.render('newsPage', require('./data/news-page'));
        })
        .get('/', (req, res) => {
            res.render('index', require('./data/index'));
        })
        .get('*', (req, res) => {
            res.sendStatus(404)
        })
        .post('*', (req, res) => {
            res.sendStatus(404)
        });
};
