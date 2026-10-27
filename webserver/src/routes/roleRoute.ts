import { Router } from 'express'
import { e_route, e_params } from '@/types/routePaths.js'
import { getRoleController } from '@/controllers/roleController.js'

const roleRoute = Router();

const getRolePath = `${e_route.myrole}`

roleRoute.get(getRolePath, getRoleController);
export { roleRoute }
