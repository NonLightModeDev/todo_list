import { Schema } from 'mongoose'

const schema = new Schema({
    task: String,
    status: String
})

export default schema