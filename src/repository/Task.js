import mongoose from '../config/mongoose.js'
import schema from '../models/schema/Task.js'

const model = mongoose.model('tasks', schema)

class Task {
    list() {
        return model.find({})
    }
}

export default new Task