'use strict';

class Category {
    constructor(link, name, icoSrc, icoAlt) {
        this.name = name;
        this.link = link;
        this.icoSrc = icoSrc;
        this.icoAlt = icoAlt;
    }

    static fetchAll(query) {
        return [
            new Category(`/news/general?${query}`, 'Общее', 'icons/text-lines.svg', 'text lines'),
            new Category(`/news/business?${query}`, 'Бизнес', 'icons/money-bag.svg', 'money bag'),
            new Category(`/news/entertainment?${query}`, 'Развлечения', 'icons/smile.svg', 'smile'),
            new Category(`/news/sport?${query}`, 'Спорт', 'icons/soccer.svg', 'ball'),
            new Category(`/news/health?${query}`, 'Здоровье', 'icons/cardiogram.svg', 'cardiogram'),
            new Category(`/news/science?${query}`, 'Наука', 'icons/science.svg', 'science'),
            new Category(`/news/tech?${query}`, 'Технологии', 'icons/rocket.svg', 'rocket')
        ];
    }
}

module.exports = Category;
