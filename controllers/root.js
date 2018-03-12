import express from 'express';
import NewsAPI from '../models/news';
import { categories, findCategory } from './news';

const router = express.Router(); //eslint-disable-line

router.get('/', (_, res) => res.render('index', {
    title: 'Илон слишком занят',
    header: 'Ilon, what have you done ?!',
    categories: categories
}));

router.get('/:category', async ({ params, query }, res) => {
    const category = findCategory(params.category);

    if (category) {
        res.render('news', {
            title: `Новости категории ${category.name}`,
            header: `<a href="/?${res.locals.queries}">Категории</a> : ${category.name}`,
            news: await NewsAPI.getNewsAsync({ ...params, ...query })
        });
    } else {
        res.sendStatus(404);
    }
});

export default router;
