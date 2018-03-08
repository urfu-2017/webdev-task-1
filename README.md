# Задача «Илон слишком занят»

Перед выполнением задания внимательно прочитайте:

- [О всех этапах проверки задания](https://github.com/urfu-2017/guides/blob/master/workflow/overall.md)
- [Как отправить пулл](https://github.com/urfu-2017/guides/blob/master/workflow/pull.md)
- [Как пройти тесты](https://github.com/urfu-2017/guides/blob/master/workflow/test.md)
- Правила оформления [javascript](https://github.com/urfu-2017/guides/blob/master/codestyle/js.md), [HTML](https://github.com/urfu-2017/guides/blob/master/codestyle/html.md) и [CSS](https://github.com/urfu-2017/guides/blob/master/codestyle/css.md) кода

## Основное задание
Билли отправляется в пушетествие, но он не смог найти удобный сервис для того, чтобы смотреть
погоду и новости в любой точке мира. И поэтому он попросил сделать такой сервис своего друга - Илона. Но Илон слишком занят,
он создаёт себе новый автомобиль, и вся надежда на вас – юные изобретатели.

Билли очень хотел бы, чтобы сервис выглядел примерно так:

На главной странице есть шапка, виджет погоды, список категорий новостей и подвал:<br/>
<img src="https://user-images.githubusercontent.com/7279995/36676032-6af9d706-1b2c-11e8-8a68-b00134397140.JPG" width="576">

По нажатию на категорию открывается страница с новостями этой категории:<br/>
<img src="https://user-images.githubusercontent.com/7279995/36676034-6b3db6b0-1b2c-11e8-8910-908c1f81c1c9.JPG" width="576">

Виджет погоды выглядит так:</br>
<img src="https://user-images.githubusercontent.com/7279995/36676033-6b1c0f74-1b2c-11e8-95e8-ab4538bf1297.JPG" width="576">

Для получения новостей используйте [news API](https://newsapi.org).<br/>
Для получения данных о погоде используйте [meta weather](https://www.metaweather.com/api).

Так как Билли не хочет, чтобы за ним следили: он передаёт свою геолокацию через GET-параметры:

Для погоды:
- либо `query`, чтобы задать название места
- либо `lat` и `lon`, чтобы задать координаты места

Для новостей:
- `country`, чтобы задать страну

Обратите внимание, что информация о погоде используется сразу на двух страницах,
и было бы очень круто, если бы этот код был написан 1 раз.

### Требования
- В качестве веб-сервера необходимо использовать [Express](http://expressjs.com/ru)
- Используйте паттерн [MVC](https://ru.wikipedia.org/wiki/Model-View-Controller)
- В качестве шаблонизатора использовать
    - либо [handlebarsJS](http://handlebarsjs.com)
    - либо [bh](https://github.com/bem/bh)
- Вёрстка должна соответствовать методологии [БЭМ](https://ru.bem.info/methodology)
- Все данные должны храниться в формате `JSON`
- Вся статика должна храниться в папке `public`

![Ilon](https://user-images.githubusercontent.com/7279995/36676329-33914366-1b2d-11e8-97c2-ddb54124747b.jpg)
