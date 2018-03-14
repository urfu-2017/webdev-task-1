'use strict';

const storage = [];

class Topic {
    constructor({ name, description, picture }) {
        this.name = name;
        this.description = description;
        this.picture = picture;
    }

    save() {
        storage.push(this);
    }

    static getAll() {
        return storage;
    }

    static find(topicName) {
        return storage.find(x => x.name === topicName);
    }
}

module.exports = Topic;
