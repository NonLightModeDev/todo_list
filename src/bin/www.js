import app from '../app.js'
import debug from 'debug'
import config from 'config'

const log = debug('todo_list:src:bin:www')
const port = config.get('server.port')

app.listen(port, () => log(`Server running at port ${port}`))