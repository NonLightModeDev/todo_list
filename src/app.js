import express from 'express'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import routerIndex from './routes/Index.js'
import routerTask from './routes/Task.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, '../public')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', routerIndex)
app.use('/tasks', routerTask)

export default app