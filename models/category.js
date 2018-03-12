'use strict';

const categories = [
    { key: 'business', name: 'Business' },
    { key: 'entertainment', name: 'Entertainment' },
    { key: 'general', name: 'General' },
    { key: 'health', name: 'Health' },
    { key: 'science', name: 'Science' },
    { key: 'sports', name: 'Sports' },
    { key: 'technology', name: 'Technology' }
];

class Category {

    static list() {
        return categories;
    }

    static find(key) {
        return categories.find(c => c.key === key) || null;
    }
}

module.exports = Category;
