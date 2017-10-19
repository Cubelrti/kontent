const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

db.defaults({ posts: [], user: {} })
.write()

module.exports = function () {
    return function (req, res, next) {
        console.log("received:" + req.body)
        db.get('posts')
        .push({ id: 1, title: 'lowdb is awesome', article: req.body})
        .write()
        res.sendStatus(200)
    }
}