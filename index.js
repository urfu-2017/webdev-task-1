import dotenv from 'dotenv';
import express from 'express';
import hbs from 'express-handlebars';

import setupMiddleware from './middleware';
import rootRouter from './controllers/root';

dotenv.config();

const app = express();

app.engine('hbs', hbs({
    extname: 'hbs',
    partialsDir: [`${__dirname}/views/partials`]
}));

app.set('view engine', 'hbs');

setupMiddleware(app);

app.use('/', rootRouter);

export default app.listen(8080);
