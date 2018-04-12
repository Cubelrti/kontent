const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('settings.db.json')
const db = low(adapter)

db.defaults({ settings: {
    displayTitle: 'Kontent',
    slogan: 'A file-based lightweight CMS.',
}
}).write();

let writeConfiguration = function () {
    return function (req, res, next) {
        db.get('settings').assign(req.body)
            .write();
        res.sendStatus(200);
    }
}

let getConfiguration = function () {
    return function (req, res, next) {
        let settings = db.get('settings').value();
        res.send(settings);
    }
}

module.exports = {
    writeConfiguration,
    getConfiguration
}