'use strict';

const categoryTitles = require('../models/categories.ru');
const backLink = { url: '/', caption: 'На главную' };

class Header {
    static build(params) {
        const { category } = params;
        if (typeof category !== 'string') {
            return { title: 'Новости' };
        }
        const title = categoryTitles[category];

        return { title, backLink };
    }
}

module.exports = Header;
