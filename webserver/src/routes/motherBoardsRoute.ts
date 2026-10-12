import { Router } from 'express';
import { addMotherBoardController, getAllMotherBoardController, setDeleteMotherBoardController } from '@/controllers/motherBoardsController.js';
import { e_route } from './types.js'

const motherBoardRouter =  Router();
motherBoardRouter.get(`${e_route.mother_boards}`, getAllMotherBoardController)
motherBoardRouter.post(`${e_route.mother_boards}`, addMotherBoardController)
motherBoardRouter.patch(`${e_route.mother_boards}:id`, setDeleteMotherBoardController)

export { motherBoardRouter }