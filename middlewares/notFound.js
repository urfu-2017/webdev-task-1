'use strict';

exports.error404 = (req, res) => {
    res.status(404).send('Данная страница не существует');
};
