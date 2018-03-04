'use strict';
const Post = require('../models/post');

const categories = [
    { key: 'business', name: 'Business' },
    { key: 'entertainment', name: 'Entertainment' },
    { key: 'general', name: 'General' },
    { key: 'health', name: 'Health' },
    { key: 'science', name: 'Science' },
    { key: 'sports', name: 'Sports' },
    { key: 'technology', name: 'Technology' }
];

exports.index = (req, res) => {
    res.render('index.bemjson.js', { categories });
};

exports.category = async (req, res) => {
    try {
        const category = categories.find(c => c.key === req.params.category);
        const country = req.query.country || 'us';

        if (!category) {
            return res.sendStatus(404);
        }

        const posts = await Post.list(category.key, country);

        res.render('category.bemjson.js', { category: category.name, posts });
    } catch (e) {
        res.sendStatus(500);
    }
};
