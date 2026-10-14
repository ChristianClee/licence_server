import { Router } from 'express';
import { addUserController, getAllUsersController, setDeletedUserController } from '@/controllers/usersController.js';
import { e_route } from '../types/routePaths.js'


const userRouter = Router();
userRouter.get(`${e_route.users}`, getAllUsersController );
userRouter.post(`${e_route.users}`, addUserController );
userRouter.patch(`${e_route.users}:id`, setDeletedUserController );

export { userRouter };