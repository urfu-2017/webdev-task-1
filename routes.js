import pages from './controllers/pages';

export default (app) => {
    pages.forEach(page => app.get(page.url, page.request));
    app.all('*', (_, res) => res.sendStatus(404));
};
