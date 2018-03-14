'use strict';

const path = require('path');

const dotenv = require('dotenv');

const defaultValues = dotenv.config({ path: path.join(__dirname, '../.env') }).parsed;

exports.newsItems = (req, res, next) => {
    req.newsItems = [
        { topic: defaultValues.BUSINESS_TOPIC,
            link: defaultValues.BUSINESS_LINK,
            icon: defaultValues.BUSINESS_ICON },
        { topic: defaultValues.ENTERTAINMENT_TOPIC,
            link: defaultValues.ENTERTAINMENT_LINK,
            icon: defaultValues.ENTERTAINMENT_ICON },
        { topic: defaultValues.GENERAL_TOPIC,
            link: defaultValues.GENERAL_LINK,
            icon: defaultValues.GENERAL_ICON },
        { topic: defaultValues.HEALTH_TOPIC,
            link: defaultValues.HEALTH_LINK,
            icon: defaultValues.HEALTH_ICON },
        { topic: defaultValues.SCIENCE_TOPIC,
            link: defaultValues.SCIENCE_LINK,
            icon: defaultValues.SCIENCE_ICON },
        { topic: defaultValues.SPORT_TOPIC,
            link: defaultValues.SPORT_LINK,
            icon: defaultValues.SPORT_ICON },
        { topic: defaultValues.TECH_TOPIC,
            link: defaultValues.TECH_LINK,
            icon: defaultValues.TECH_ICON }
    ];
    next();
};
