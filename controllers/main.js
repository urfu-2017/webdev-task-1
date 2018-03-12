'use strict';

const category = [
    { id: 'business', name: 'Бизнес' },
    { id: 'entertainment', name: 'Развлечения' },
    { id: 'general', name: 'Общее' },
    { id: 'health', name: 'Здоровье' },
    { id: 'science', name: 'Наука' },
    { id: 'sports', name: 'Спорт' },
    { id: 'technology', name: 'Технологии' }
];

exports.main = async (req, res) => {
    const locals = res.locals;
    const weather = res.weather;

    const data = { weather, category, locals };

    res.render('index', data);
};
