'use strict';

import bodyParser from 'body-parser';
import morgan from 'morgan';
import express from 'express';
import hbs from 'hbs';
import helperDate from 'helper-date';
import lessMiddleware from 'less-middleware';
import path from 'path';

import routes from './routes';

const app = express();

app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(lessMiddleware(path.resolve(__dirname, 'public')));
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(morgan('dev'));
routes(app);
hbs.registerHelper('date', helperDate);
hbs.registerPartials(path.resolve(__dirname, 'views/partials'), () => {
    app.listen(8080);
});

module.exports = app;
