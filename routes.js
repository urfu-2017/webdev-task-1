'use strict';

const pages = require('./controllers/pages');

module.exports = (app) => {
    pages.forEach(page => app.get(page.url, page.request));
    app.all('*', (_, res) => res.sendStatus(404));
};
