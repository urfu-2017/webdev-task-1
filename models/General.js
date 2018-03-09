class General {
    constructor(name, developer, year) {
        let header = {
            name: name
        };
        let footer = {
            dev: developer,
            year: year
        };
        this.header = header;
        this.footer = footer;
    }
}

// const gen = new General('PogodaNovosti', 'spt30', 2018);
// console.log(gen.getInfo(gen.footer));
module.exports = General;
