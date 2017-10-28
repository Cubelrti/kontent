const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('users.db.json')
const db = low(adapter)

db.defaults({ users: [] })
    .write();

let userSignUp = function () {
    return function (req, res) {
        let user = db.get('users')
            .push(req.body)
            .last()
            .assign({ registeredIpAddr: req.ip })
            .write()
        res.sendStatus(200);
    }
}

let setUserAddr = function (req) {
    let user = db.get('users')
        .find({ username: req.user.username })
        .assign({ ip: req.ip })
        .write();
}

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

module.exports = {
    findByUsername,
    findById,
    setUserAddr,
    userSignUp
}