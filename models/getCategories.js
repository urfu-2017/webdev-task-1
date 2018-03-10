'use strict';
const _ = require('lodash');
const categoriesName = require('../mocks/categories');
class Categories {
    static cat() {
        let items = _.toPairs(categoriesName).map(([el, name]) => ({
            url: '/' + el,
            icon: '/pic/' + el + '.svg',
            name
        }));

        return { title: 'Категории новостей', items };
    }
}
module.exports = Categories;
