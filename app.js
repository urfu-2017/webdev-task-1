'use strict';

import path from 'path';
import express from 'express';
import hbs from 'hbs';
import routes from './routes';
import categoriesName from './mocks/categories';
export const app = express();
const viewsDir = path.join(__dirname, 'views');
const partialsDir = path.join(viewsDir, 'partials');
const publicDir = path.join(__dirname, 'public');

app.set('view engine', 'hbs');
app.set('view options', { layout: 'data' });
app.set('views', viewsDir);

app.use(express.static(publicDir));

app.use((req, res, next) => {
    res.locals.categories = categoriesName;
    res.locals.title = 'Категории новостей';

    next();
});

routes(app);
hbs.registerPartials(partialsDir, () => {
    app.listen(8080);
});
