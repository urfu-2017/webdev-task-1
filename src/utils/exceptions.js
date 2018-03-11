'use strict';

class HttpError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
    }
}

class BadRequest extends HttpError {
    constructor(message) {
        super(message, 400);
    }
}

class NotFound extends HttpError {
    constructor(message) {
        super(message, 404);
    }
}

class ServerError extends HttpError {
    constructor(message) {
        super(message, 500);
    }
}

module.exports = { HttpError, BadRequest, NotFound, ServerError };
