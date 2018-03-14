'use strict';

module.exports = app => {
    app.all('*', (req, res) => {
        res.sendStatus(404);
    });
};
