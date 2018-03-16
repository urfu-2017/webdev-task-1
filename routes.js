'use strict';
import { error404 } from './controllers/errors';
import { categories, news } from './controllers/data';

module.exports = app => {
    app.get('/', categories);
    app.get('/:category', news);
    app.all('*', error404);
};
