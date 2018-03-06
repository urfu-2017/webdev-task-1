import NewsAPI, { categories, findCategory } from '../models/news';

export default [
    {
        url: '/',
        request: (req, res) => res.render('index', {
            title: 'Илон слишком занят',
            header: 'Ilon, what have you done ?!',
            categories: categories
        })
    },
    {
        url: '/:category',
        request: async ({ params, query }, res) => {
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
        }
    }
];
