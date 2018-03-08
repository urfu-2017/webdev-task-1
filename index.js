'use strict'
require('babel-core/register')
const { app } = require('./app')
module.exports = app

if (require.main === module) {
    app.listen(8080, () => console.log('Running on localhost:8080'))
}
