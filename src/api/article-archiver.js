const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('article.db.json')
const db = low(adapter)

db.defaults({ articles: [] })
    .write();

let writeArticle = function () {
    return function (req, res, next) {
        db.get('articles')
            .push(req.body)
            .last()
            .assign({ id: Date.now().toString() })
            .assign({ userId: req.user.id })
            .write()
        res.sendStatus(200)
    }
}

let getAllArticle = function () {
    return function (req, res, next) {
        let articles = db.get('articles')
            .find({ userId: req.user.id })    
            .value()
        res.send(articles);
    }
}

let getArticleById = function () {
    return function (req, res, next) {
        let article = db.get('articles')
            .find({ id: req.params.id })    
            .value()
        res.send(article);
    }
}

module.exports = {
    writeArticle,
    getAllArticle,
    getArticleById
}