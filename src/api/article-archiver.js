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
            .filter({ userId: req.user.id })    
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

let editArticleById = function () {
    return function (req, res, next) {
        let { title, text } = req.body;
        let article = db.get('articles')
            .find({ id: req.params.id })    
            .assign({ title: title, text: text })
            .write()
        res.sendStatus(200)
    }
}

let removeArticleById = function () {
    return function (req, res, next) {
        let article = db.get('articles')
            .remove({ id: req.params.id })
            .write()
        res.sendStatus(200);
    }
}

module.exports = {
    writeArticle,
    getAllArticle,
    getArticleById,
    removeArticleById,
    editArticleById
}