'use strict';

const cathegories = require('../mocks/weather');

// Каждый контроллер (controller) обычно экспортирует
// несколько функций-действий (actions)

exports.listCathegories = (req, res) => {
    // Объединяем данные специфичные для контроллера с общими данными
    const data = { cathegories };
    res.render('index', data);
};

exports.listNews = (req, res) => {
    const flag = 1;
    // Объединяем данные специфичные для контроллера с общими данными
    const data = { cathegories, flag };
    res.render('cathegory', data);
};
