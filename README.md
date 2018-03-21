# Задача «Илон слишком занят»

В основе приложения [Express.js](https://expressjs.com/) и [Handelbars](http://handlebarsjs.com/).

Для того, чтобу установить зависимости выполняем:

```sh
npm install
```

Для запуска с конфигурацией по умолчанию (config/default.js):

```
node index.js
```

Для запуска с production-конфигурации (config/production.js):

```
NODE_ENV=production node index.js
```

Далее переходим по адресу:
http://localhost:8080/

Чтобы задать город для отображения погода: http://localhost:8080/?query=london или http://localhost:8080/?lat=51.506321&lon=-0.12714

Чтобы задать страну для выбора новостей: http://localhost:8080/?country=us