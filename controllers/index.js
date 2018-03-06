'use strict';

const Category = require('../models/category');


exports.list = (req, res) => {

    let categories = Category.getAllCategories();
    let currentYear = new Date().getFullYear();
    let data = {categories, ...res.locals, currentYear};
    
    res.render('index', data);
    // const county = req.params.country;

    // let promises = Category.getAll(county);
    // console.log(county);  
};


