import { index, newsCategory } from './controllers/main';
import { error404 } from './controllers/errors';


export default app => {
    app.get('/', index);
    app.get('/:category', newsCategory);

    app.all('*', error404);
};
