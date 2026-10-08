import { Router } from 'express';
// import { getUsers } from '../controllers/usersController';
import type { Request, Response } from 'express';

function todoRote ( req:Request, res:Response ){

}

// TODO
const userRouter = Router();

userRouter.get('/user', todoRote );
userRouter.post('/user', todoRote );
userRouter.put('/user', todoRote );
userRouter.delete('/user', todoRote );



export { userRouter };