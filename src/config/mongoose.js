import mongoose from 'mongoose'
import config from 'config'
import debug from 'debug'

const log = debug('todo_list:src:config:mongoose')

mongoose.connect(config.get("mongo.uri"))
mongoose.connection.on('error', err => log('mongo err', err))

export default mongoose