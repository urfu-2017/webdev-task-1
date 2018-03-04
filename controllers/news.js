'use strict'

const News = require('../models/News');
const { getNewsByCategory } = require('../repository/newsRepository');
const storage = [];

exports.newsList = (req, res) => {
    var categoryName = req.params.name;

    console.log('eazy for me ',getNewsByCategory(categoryName));
    res.sendStatus(201);
}