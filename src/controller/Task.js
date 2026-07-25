import repository from '../repository/Task.js'

class Task {
    async list(req, res, next) {
        const result = await repository.list()
        const newTaskList = result.filter(task => task.status == 'new')
        const doingList = result.filter(task => task.status == 'doing')
        const doneList = result.filter(task => task.status == 'done')
        res.json({
            new: newTaskList,
            doing: doingList,
            done: doneList
        })
    }

    async getById(req, res, next) {
        const result = await repository.getById(req.params.id)
        res.json(result)
    }

    async create(req, res, next) {
        try {
            const result = await repository.create(req.body)
            res.sendStatus(201).end()
        } catch(e) {
            res.sendStatus(500).end()
        }
    }

    async deleteById(req, res, next) {
        try {
            const result = await repository.deleteById(req.params.id)
            res.sendStatus(204).end()
        } catch(e) {
            res.sendStatus(500).end()
        }
    }

    async updateById(req, res, next) {
        try {
            const result = await repository.updateById(req.params.id, req.body)
            res.sendStatus(200).end()
        } catch(e) {
            res.sendStatus(500).end()
        }
    }
}

export default new Task