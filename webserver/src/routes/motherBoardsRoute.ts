import { Router } from 'express';
import { addMotherBoardController, getAllMotherBoardController, setDeleteMotherBoardController } from '@/controllers/motherBoardsController.js';
import { e_params, e_route } from '../types/routePaths.js'

const getAllMotherBoardPath = `${e_route.companies}${e_params.id_company}${e_route.mother_boards}`
const addMotherBoardPath = `${e_route.companies}${e_params.id_company}${e_route.mother_boards}`


const motherBoardRouter =  Router();

motherBoardRouter.get(getAllMotherBoardPath, getAllMotherBoardController)
motherBoardRouter.post(addMotherBoardPath, addMotherBoardController)
motherBoardRouter.patch(`${e_route.mother_boards}:id`, setDeleteMotherBoardController)

export { motherBoardRouter }