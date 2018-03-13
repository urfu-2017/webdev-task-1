'use strict';

const Category = require('../models/category');
const Post = require('../models/post');

exports.index = (req, res) => {
    const categories = Category.list();
    res.render('index.bemjson.js', { categories });
};

exports.category = async (req, res) => {
    const category = Category.find(req.params.category);
    const country = req.query.country || 'us';

    if (!category) {
        return res.sendStatus(404);
    }

    const posts = await Post.list(category.key, country);

    res.render('category.bemjson.js', { category: category.name, posts });
};
