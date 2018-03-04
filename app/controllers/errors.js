'use strict';

// Код «404 Not Found» отправляют в ответ на отсутствующий http-ресурс
exports.error404 = (req, res) => res.sendStatus(404);
