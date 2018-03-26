'use strict';

const configValues = require('../config.json');

exports.newsItems = (req, res, next) => {
    req.newsItems = [
        {
            topic: configValues.BUSINESS_TOPIC,
            link: configValues.BUSINESS_LINK,
            icon: configValues.BUSINESS_ICON
        },
        {
            topic: configValues.ENTERTAINMENT_TOPIC,
            link: configValues.ENTERTAINMENT_LINK,
            icon: configValues.ENTERTAINMENT_ICON
        },
        {
            topic: configValues.GENERAL_TOPIC,
            link: configValues.GENERAL_LINK,
            icon: configValues.GENERAL_ICON
        },
        {
            topic: configValues.HEALTH_TOPIC,
            link: configValues.HEALTH_LINK,
            icon: configValues.HEALTH_ICON
        },
        {
            topic: configValues.SCIENCE_TOPIC,
            link: configValues.SCIENCE_LINK,
            icon: configValues.SCIENCE_ICON
        },
        {
            topic: configValues.SPORT_TOPIC,
            link: configValues.SPORT_LINK,
            icon: configValues.SPORT_ICON
        },
        {
            topic: configValues.TECH_TOPIC,
            link: configValues.TECH_LINK,
            icon: configValues.TECH_ICON
        }
    ];
    next();
};
