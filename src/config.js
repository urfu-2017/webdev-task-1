'use strict';

const path = require('path');

exports.serverHost = '0.0.0.0';
exports.serverPort = 8080;
exports.publicDir = path.join(__dirname, 'public');
exports.viewsDir = path.join(__dirname, 'views');
exports.partialsDir = path.join(exports.viewsDir, 'partials');
exports.newsApiKey = '93779c7a5b2346b89fbb5e870a288cde';
