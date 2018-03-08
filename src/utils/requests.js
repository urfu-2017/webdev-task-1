'use strict';

const fetch = require('node-fetch');

const jsonRequest = async (url, requestSettings) => {
    let response;
    try {
        response = await fetch(url, requestSettings);
    } catch (err) {
        response = { status: 0, statusText: 'Сервер не отвечает' };
    }

    let responseBody;
    try {
        responseBody = response.json ? await response.json() : null;
    } catch (err) {
        responseBody = null;
    }

    return { status: response.status, message: response.statusText, body: responseBody };
};

module.exports = { jsonRequest };
