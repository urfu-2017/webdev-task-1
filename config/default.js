'use strict';

module.exports = {
    port: 8080,
    meta: { charset: 'utf-8' },
    lang: 'ru',
    title: 'Твой день',
    weatherApi: {
        url: 'https://www.metaweather.com/api/',
        querySearch: 'location/search/?query=',
        lattlongSearch: 'location/search/?lattlong=',
        idSearch: 'location/',
        states: {
            'sn': 'Снег',
            'sl': 'Слякоть',
            'h': 'Град',
            't': 'Гроза',
            'hr': 'Ливень',
            'lr': 'Дождь',
            's': 'Пасмурно',
            'hc': 'Облачно',
            'lc': 'Немного облачно',
            'c': 'Ясно'
        }
    }
};
