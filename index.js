import express from 'express';
import hbs from 'express-handlebars';

import config from './config';
import setupMiddleware from './middleware';
import setupRoutes from './routes';

const app = express();

app.engine('hbs', hbs({
    extname: 'hbs',
    partialsDir: [`${__dirname}/views/partials`]
}));

app.set('view engine', 'hbs');

setupMiddleware(app);
setupRoutes(app);

export default app.listen(config.PORT);
