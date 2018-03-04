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

module.exports = (req, res) => {
    res.render('index.bemjson.js', { categories });
};
