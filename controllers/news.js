const getNewsCategory = require('../models/getNews');
// const aboutAuthor = require('./aboutAuthor');
const getWeather = require('../models/getWeather');
const Widget = require('../models/Widget');
const numberMonth = require('../models/numberMonth');
const url = require('url');
const General = require('../models/General');

let list = ['business', 'entertainment', 'general', 'health', 'science', 'sport', 'technology'];

const aboutAuthor = new General('Удобный сервис для Билли', 'spt30', '2018');

const allNewsAsync = () => Promise.all([
    getNewsCategory(list[0]),
    getNewsCategory(list[1]),
    getNewsCategory(list[2]),
    getNewsCategory(list[3]),
    getNewsCategory(list[4]),
    getNewsCategory(list[5]),
    getNewsCategory(list[6])]);

const getNews = async () => {
    try {
        return await allNewsAsync();
    } catch (err) {
        return console.error(err);
    }
};

const getWeatherThere = async (city) => {
    try {
        return await getWeather(city);
    } catch (err) {
        return console.error(err);
    }
};

let weather;
let news;

exports.getInfo = async (req, res) => {
    await getWeatherThere('moscow')
        .then(result => {
            weather = new Widget(result);

            return weather;
        });
    const data = { weather, aboutAuthor };
    Object.assign(data, res.locals);
    // console.log(data);
    res.render('index', data);
    // res.sendStatus(200);
};

exports.news = async (req, res) => {
    const category = req.params.name;
    await getNews()
        .then(response => response.map(elem => elem.articles))
        .then(onlyNews => onlyNews.map(elem => parseUseful(elem)))
        .then(arrNews => arrNews[list.indexOf(category)])
        .then(newsCat => {
            news = newsCat;

            return news;
        });
    await getWeatherThere('moscow')
        .then(result => {
            weather = new Widget(result);

            return weather;
        });
    const data = { news, weather, aboutAuthor };
    const resData = Object.assign(data, res.locals);
    // console.log(data);
    res.render('news', resData);
    // res.sendStatus(200);
};

function parseUseful(arrNewsOfCat) {
    return arrNewsOfCat.map(oneNews => {
        // console.log(oneNews);
        let tempTime = new Date(oneNews.publishedAt);
        let day = tempTime.getUTCDate();
        let month = numberMonth(tempTime.getUTCMonth());
        let date = day + ' ' + month;
        let tempUrl = url.parse(oneNews.url);
        let sourceUrl = tempUrl.protocol + '//' + tempUrl.host + '/';
        // console.log(sourceUrl);

        return {
            source: oneNews.source.name,
            sourceUrl: sourceUrl,
            title: oneNews.title,
            description: oneNews.description,
            url: oneNews.url,
            urlToImage: oneNews.urlToImage,
            publishedAt: date
        };
    });
}
