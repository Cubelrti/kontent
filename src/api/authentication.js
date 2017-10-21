const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('users.db.json')
const db = low(adapter)

db.defaults({ users: [] })
    .write();


let findByUsername = function (username, callback) {
    let user = db.get('users')
        .find({ username: username })   
        .value();
    callback(null, user)
}

let findById = function (id, callback) {
    let user = db.get('users')
        .find({ id: id })   
        .value();
    callback(null, user)
}

let writeArticle = function () {
    return function (req, res, next) {
        db.get('articles')
            .push(req.body)
            .last()
            .assign({ id: Date.now().toString() })
            .write()
        res.sendStatus(200)
    }
}


module.exports = {
    findByUsername,
    findById
}