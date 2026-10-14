import { Router } from 'express';
import { getAllSuperUsersController } from '@/controllers/supersUserController.js';
import { e_route } from '../types/routePaths.js'


const superUserRouter = Router();
superUserRouter.get(`${e_route.super_users}`, getAllSuperUsersController );

export { superUserRouter };