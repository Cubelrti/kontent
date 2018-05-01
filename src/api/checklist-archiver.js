const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('checklist.db.json')
const db = low(adapter)

db.defaults({ checklists: [] })
    .write();

let writeChecklist = function () {
    return function (req, res, next) {
        db.get('checklists')
            .push(req.body)
            .last()
            .assign({ id: Date.now().toString() })
            .assign({ userId: req.user.id })
            .assign({ subversion: []})
            .write()
        res.sendStatus(200)
    }
}

let getAllChecklist = function () {
    return function (req, res, next) {
        let checklists = db.get('checklists')
            .value()
        res.send(checklists);
    }
}

let editChecklistById = function () {
    return function (req, res, next) {
        let { title, text } = req.body;
        let checklist = db.get('checklists')
            .find({ id: req.params.id });
        let subversions = checklist.get('subversion').concat(checklist.get('text').value()).value();
        checklist.assign({ title: title, text: text, subversion: subversions })
            .write()
        res.sendStatus(200)
    }
}

let removeChecklistById = function () {
    return function (req, res, next) {
        let checklist = db.get('checklists')
            .remove({ id: req.params.id })
            .write()
        res.sendStatus(200);
    }
}

module.exports = {
    writeChecklist,
    getAllChecklist,
    editChecklistById,
    removeChecklistById
}