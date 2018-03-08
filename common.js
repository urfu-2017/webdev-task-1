const moment = require('moment')
const assert = require('assert')

const config = {
    newsApiKey: 'af406ce76d00443f90f40b9a2e5f2da4',
    siteName: 'Local extremum',
    testApiKey: 'af406ce76d00443f90f40b9a2e5f2da4'
}

const mwStateToIcon = state => 'icofont-' + ({
    sn: 'snowy',
    sl: 'snowy-rainy',
    h: 'hail',
    t: 'rainy-thunder',
    hr: 'rainy',
    lr: 'rainy',
    s: 'rainy-sunny',
    hc: 'clouds',
    lc: 'cloudy',
    c: 'sun-alt'
}[state])


const categoryToIcon = category => 'icofont-' + ({
    business: 'briefcase',
    entertainment: 'emo-nerd-smile',
    general: 'world',
    health: 'medical-sign-alt',
    science: 'electron',
    sports: 'skiing-man',
    technology: 'gears'
}[category])


const checkType = (union, typeName) => union.case({ 
    [typeName]: () => {}, 
    _: () => assert.fail(`Thats not a ${typeName}`)
})


const handlebarsHelpers = {
    displayRussianDate: date => moment(date).locale('ru').format('Do MMMM'),
    head: list => list[0],
    tail: list => list.slice(1),
    round: (digits, number) => number.toFixed(digits),
    fmtTemp: temp => (temp == 0 ? '0' : ((temp > 0 ? '+' : '') + temp.toFixed(1))) + ' ℃',
    fmtWind: wind => `${wind.toFixed(2)} м/c`,
    mwStateToIcon,
    categoryToIcon
}

module.exports = { config, handlebarsHelpers, checkType }
