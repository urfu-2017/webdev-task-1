'use strict';

const storage = [];

class Note {
    constructor({ name, url }) {
        this.name = name;
        this.url = url;
    }

    save() {
        storage.push(this);
    }

    static findAll() {
        return storage;
    }
}

module.exports = Note;
