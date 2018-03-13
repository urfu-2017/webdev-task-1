const path = require('path');

const express = require('express');
const hbs = require('hbs');

const commonData = require('./app/middlewares/common-data');
const routes = require('./app/routes');
const config = require('./config/localhost');
const errorHandler = require('./app/middlewares/handle-errors');

const app = express();


const viewsDir = path.join(__dirname, 'app/views');
const publicDir = path.join(__dirname, 'app/public');
const partialsDir = path.join(viewsDir, 'partials');

app.set('view engine', 'hbs');
app.set('views', viewsDir);

app.use(express.static(publicDir));
app.use(commonData);
app.use(errorHandler);

routes(app);

hbs.registerPartials(partialsDir, () => {
  const { port } = config;

  app.listen(port, () => {
    console.info(`Server started on ${port}`);
    console.info(`Open http://localhost:${port}/`);
  });
});

module.exports = app;
