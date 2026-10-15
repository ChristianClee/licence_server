import { Router } from 'express';
import { addUserController, getAllUsersController, setDeletedUserController } from '@/controllers/usersController.js';
import { e_route, e_params } from '@/types/routePaths.js'


const getAllUserPath = `${e_route.companies}${e_params.id_company}${e_route.users}`
const addUserPath = `${e_route.companies}${e_params.id_company}${e_route.users}`
const setDeletedUserPath = `${e_route.companies}${e_params.id_company}${e_route.users}${e_params.id_user}`

const userRouter = Router();

userRouter.get(getAllUserPath, getAllUsersController );
userRouter.post(addUserPath, addUserController );
userRouter.patch(setDeletedUserPath, setDeletedUserController );

export { userRouter };