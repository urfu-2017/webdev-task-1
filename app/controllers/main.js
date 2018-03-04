'use strict';

const Widget = require('../models/widget');
const request = require('request');


// exports.list = (req, res) => {
//     const notes = Note.findAll();
//
//     // Объединяем данные специфичные для контроллера с общими данными
//     const data = {notes, ...res.locals};
//
//     res.render('index', data);
// };

// exports.item = (req, res) => {
//     const name = req.params.name;
//     const note = Note.find(name);
//     const data = {note, ...res.locals};
//
//     if (note) {
//         res.render('note', data);
//     } else {
//         // Код «404 Not Found» отправляют в ответ на отсутствующий http-ресурс,
//         // в нашем случае отстутствующую заметку
//         res.sendStatus(404);
//     }
// };

exports.weather = (req, res) => {
    (new Promise((resolve, reject) => {
        request(`${res.locals.weatherApiBasePath}api/location/search/?query=${req.query.query}`,
            (error, response, body) => {
                const woeid = JSON.parse(body)[0].woeid;
                console.log(woeid);
                resolve(woeid);
            });
    }).then((woeid) => {
        request(`${res.locals.weatherApiBasePath}api/location/${woeid}/`,
            (error, response, body) => {
                const info = JSON.parse(body);
                console.log(info);
                const widget = new Widget({ city: 'EKB' });
                const data = { widget, ...res.locals };
                res.render('index', data);
            })
    }));
};

exports.create = (req, res) => {
    // Благодаря body-parser мидлваре у нас в поле `body`
    // разобранное тело POST запрос

    // const note = new Note(req.body);

    // note.save();

    // Редирект с кодом «302 Moved Temporarily»
    // не позволяет отправлять форму дважды
    res.redirect(302, '/notes');
};
