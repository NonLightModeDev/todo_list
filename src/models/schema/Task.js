import { Schema } from 'mongoose'

const schema = new Schema({
    task: {
        type: String,
        unique: true
    },
    status: String
})

export default schema