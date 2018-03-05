import express from 'express';

import weatherMiddleware from './middlewares/weather';
import queriesMiddleware from './middlewares/queries';

export default (app) => {
    app.use(express.static(`${__dirname}/public`));
    app.use(weatherMiddleware);
    app.use(queriesMiddleware);
};
