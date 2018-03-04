'use strict'

const request = require('request');
const News = require('../models/news');

const apiKey = 'ec92adb8527b48ae81a476953bd5c758';
const country = 'ru';
const apiString = `https://newsapi.org/v2/top-headlines?country=${country}&category={{category}}&apiKey=${apiKey}`;
// https://newsapi.org/v2/top-headlines?country=ru&apiKey=ec92adb8527b48ae81a476953bd5c758

exports.getNewsByCategory = (category) => {
    const apiURL = apiString.replace("{{category}}", category);
    
    let promise = new Promise((resolve, reject) => {
        request(apiURL, (error, response, body) => {
            let list;
            if (!error && response.statusCode == 200) {
                // console.log(body);
                let result = JSON.parse(body);
                list = createNews(result.articles, category);         
                   
            }
            resolve(list);
            // console.log(list);
        });
    })
    let newsList;
    promise.then(result => {
        newsList = result;
    });

    console.log(newsList);
}

const parceRequest = (apiURL, callback) => {
    request(apiURL, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // console.log(body);
            const result = JSON.parse(body);
            return newsList = createNews(result.articles, category);            
        }
    });
} 

const createNews = (data, category) => {
    return data.map((item) => {
        return new News(item);
    })
}