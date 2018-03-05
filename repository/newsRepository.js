'use strict'

const request = require('request');
const News = require('../models/news');

const apiKey = 'ec92adb8527b48ae81a476953bd5c758';
const country = 'ru';
const apiString = `https://newsapi.org/v2/top-headlines?country=${country}&category={{category}}&apiKey=${apiKey}`;
//primer https://newsapi.org/v2/top-headlines?country=ru&apiKey=ec92adb8527b48ae81a476953bd5c758

exports.getNewsByCategory = (category) => {
    const apiURL = apiString.replace("{{category}}", category);
    
    return getBodyByUrl(apiURL)
        .then(
            body => {
                if (body.status !== "ok") reject(null);
                return body.articles.map( item => new News(item));
            },
            reject => console.log(reject)
        )
}

function getBodyByUrl(url) {
    return new Promise( (resolve, reject) => {
        request(url, (error, response, body) => {
            let list;
            if (!error && response.statusCode == 200) {
                let result = JSON.parse(body);
                resolve(result);                   
            } else {
                reject(error);
            }
        });    
    })
}
