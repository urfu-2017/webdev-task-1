'use strict';
const categoryTitles = require('./categories.ru');

class Categories {
    static exists(category) {
        const categories = Object.keys(categoryTitles);

        return categories.includes(category);
    }

    static build() {
        const title = 'Категории новостей';
        const items = Object
            .entries(categoryTitles)
            .map(([name, caption]) => ({
                url: `/${name}`,
                iconSrc: `/svg/news/categories/${name}.svg`,
                caption
            }));

        return { title, items };
    }
}

module.exports = Categories;
