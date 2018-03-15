import path from 'path';

import hbs from 'hbs';
import morgan from 'morgan';
import express from 'express';

import config from '../config';
import routes from './routes';
import commonData from './middlewares/common-data';


const viewsDir = path.join(__dirname, 'views');
const partialsDir = path.join(viewsDir, 'common.blocks');
const publicDir = path.join(__dirname, 'public');

const app = express();

app.set('view engine', 'hbs');
app.set('views', viewsDir);
app.use(morgan('dev'));
app.use(express.static(publicDir));
app.use(commonData);
routes(app);

app.use((err, req, res, next) => {
    /* eslint no-unused-vars: 0 */
    console.error(err.stack);

    res.sendStatus(500);
});

hbs.registerPartials(partialsDir, () => {
    const port = config.port;

    app.listen(port, () => {
        console.info(`Server started on ${port}`);
        console.info(`Open http://localhost:${port}/`);
    });
});


export default app;
