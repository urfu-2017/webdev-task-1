import express from 'express';
import hbs from 'express-handlebars';

import config from './config';
import setupMiddleware from './middleware';
import setupRoutes from './routes';

export const launchApp = () => {
    const app = express();

    app.set('view engine', '.hbs');

    app.engine('hbs', hbs({
        extname: 'hbs',
        partialsDir: [
            `${__dirname}/views/partials`
        ]
    }));

    setupMiddleware(app);
    setupRoutes(app);

    app.listen(config.PORT);

    return app;
};


if (process.env.NODE_ENV !== 'test') {
    launchApp();
}
