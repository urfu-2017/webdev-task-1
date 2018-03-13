'use strict';

const categories = [
    { link: '/news/general', name: 'Общее', icoSrc: 'icons/text-lines.svg', icoAlt: 'text lines' },
    { link: '/news/business', name: 'Бизнес', icoSrc: 'icons/money-bag.svg', icoAlt: 'money bag' },
    { link: '/news/entertainment', name: 'Развлечения',
        icoSrc: 'icons/smile.svg', icoAlt: 'smile' },
    { link: '/news/sport', name: 'Спорт', icoSrc: 'icons/soccer.svg', icoAlt: 'ball' },
    { link: '/news/health', name: 'Здоровье',
        icoSrc: 'icons/cardiogram.svg', icoAlt: 'cardiogram' },
    { link: '/news/science', name: 'Наука', icoSrc: 'icons/science.svg', icoAlt: 'science' },
    { link: '/news/tech', name: 'Технологии', icoSrc: 'icons/rocket.svg', icoAlt: 'rocket' }
];

class Category {
    static fetchAll(query) {
        return categories.map(category => {
            let { link, name, icoSrc, icoAlt } = category;
            link = `${link}?${query}`;

            return { link, name, icoSrc, icoAlt };
        });
    }
}

module.exports = Category;
