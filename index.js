'use strict'
const express = require('express')
const exphbs  = require('express-handlebars')

const app = express()

app.engine('hbs', exphbs({ extname: '.hbs', defaultLayout: 'html5' }))
app.set('view engine', 'hbs')
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('home', {
        title: 'Home',
        totle: 'Boem'
    })
})

module.exports = app

if (require.main === module) {
    app.listen(8080, () => console.log('Running on localhost:8080'))
}
