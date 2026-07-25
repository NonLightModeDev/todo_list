import { Schema } from 'mongoose'

const schema = new Schema({
    task: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        required: true,
        enum: ['new', 'doing', 'done']
    },

},
{
    timestamps: true
})

export default schema