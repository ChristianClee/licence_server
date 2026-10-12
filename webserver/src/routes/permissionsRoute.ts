import { Router } from 'express';
import { getAllPermissionsController } from '@/controllers/permissionsController.js';
import { e_route } from './types.js'


const permissionRouter = Router();
permissionRouter.get(`${e_route.permission}`, getAllPermissionsController);

export { permissionRouter };