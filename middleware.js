import express from 'express';

import weatherMiddleware from './middlewares/weather';
import queriesMiddleware from './middlewares/queries';
import propertiesMiddleware from './middlewares/properties';

export default (app) => {
    app.use(express.static(`${__dirname}/public`));
    app.use(propertiesMiddleware);
    app.use(queriesMiddleware);
    app.use(weatherMiddleware);
};
