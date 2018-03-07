'use strict';

const path = require('path');

const express = require('express');
const hbs = require('hbs');
require('handlebars-helpers')({ handlebars: hbs });
hbs.registerHelper('dateFormat', require('handlebars-dateformat'));

const routes = require('./routes');
const common = require('./content/common');
const weather = require('./middlewares/weather');

const app = express();

module.exports = app;

const viewsDir = path.join(__dirname, 'views');
const partialsDir = path.join(viewsDir, 'partials');
const publicDir = path.join(__dirname, 'public');

app.set('views', viewsDir);
app.set('view engine', 'hbs');

app.use(weather);

routes(app);

app.use(express.static(publicDir));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

Object.assign(app.locals, common);
hbs.localsAsTemplateData(app);

hbs.registerPartials(partialsDir, () => {
    const port = 8080;
    app.listen(port, () => {
        console.info(`Server started on http://localhost:${port}/`);
    });
});
