'use strict';

const request = require('request');

exports.getParceBody = url => new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            let result = JSON.parse(body);
            resolve(result);
        } else {
            reject(new Error('Parce error'));
        }
    });
});
