import mongoose from '../config/mongoose.js'
import schema from '../models/schema/Task.js'

const model = mongoose.model('tasks', schema)

class Task {
    list() {
        return model.find({}).sort({ updatedAt: 1 }).exec()
    }

    getById(_id) {
        return model.findOne({ _id })
    }

    create(data) {
        const task = new model(data)
        return task.save()
    }

    deleteById(_id) {
        return model.deleteOne({ _id })
    }

    updateById(_id, data) {
        return model.updateOne({ _id }, data)
    }
}

export default new Task