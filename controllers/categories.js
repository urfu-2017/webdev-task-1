'use strict';

const Category = require('../models/category');

exports.list = (req, res) => {
    const categories = Category.findAll();

    const data = { categories, ...res.locals };

    res.render('index', data);
};

exports.create = (req, res) => {
    const category = new Category(req.body);
    category.save();
    res.sendStatus(201);
};
