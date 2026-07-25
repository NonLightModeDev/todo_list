import { Router } from 'express'
import Index from '../controller/Index.js'

const routerIndex = new Router()

routerIndex.get('/', Index.list)

export default routerIndex