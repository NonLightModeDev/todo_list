import { Router } from 'express'
import Task from '../controller/Task.js'

const routerTask = new Router()

routerTask.get('/', Task.list)
routerTask.get('/:id', Task.getById)
routerTask.post('/', Task.create)
routerTask.delete('/:id', Task.deleteById)
routerTask.put('/:id', Task.updateById)

export default routerTask