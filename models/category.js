'use strict';
const fs = require('fs');

class Category {
    constructor({ title, value, icon }) {
        this.title = title;
        this.value = value;
        this.icon = icon;
    }

    static loadAll(filename) {
        const data = fs.readFileSync(filename, 'utf-8');
        try {
            const readCats = JSON.parse(data);
            const categories = readCats.reduce((result, current) => {
                const category = new Category(current);
                result.push(category);

                return result;
            }, []);

            return categories;
        } catch (ex) {
            console.error(ex);

            return null;
        }
    }
}

exports.categories = Category.loadAll('categories.json');
