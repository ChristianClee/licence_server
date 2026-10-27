import { Router } from 'express'
import { e_route, e_params } from '@/types/routePaths.js'
import { checkPasswordController } from '@/controllers/passwordController.js'


const loginRoute = Router();

const checkPasswordPath = `${e_route.passwords}`

loginRoute.post(checkPasswordPath, checkPasswordController);

export { loginRoute }