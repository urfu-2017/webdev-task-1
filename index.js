const path = require('path');

const express = require('express');
const hbs = require('hbs');

const commonData = require('./app/middlewares/common-data');
const routes = require('./app/routes');

const app = express();

module.exports = app;

const viewsDir = path.join(__dirname, 'app/views');
const publicDir = path.join(__dirname, 'app/public');
const partialsDir = path.join(viewsDir, 'partials');

app.set('view engine', 'hbs');
app.set('views', viewsDir);

app.use(express.static(publicDir));
app.use(commonData);

routes(app);

app.use((err, req, res, next) => {
  /* eslint no-unused-vars: 0 */
  console.error(err.stack);

  res.sendStatus(500);
});

hbs.registerPartials(partialsDir, () => {
  const port = 8080;

  app.listen(port, () => {
    console.info(`Server started on ${port}`);
    console.info(`Open http://localhost:${port}/`);
  });
});
