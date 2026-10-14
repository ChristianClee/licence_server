import { Router } from 'express';
import { addPriceController, getAllPriceController, updatePriceController } from '@/controllers/priceController.js';
import { e_route } from '../types/routePaths.js'


const priceRouter = Router();
priceRouter.get(`${e_route.price}`, getAllPriceController );
priceRouter.post(`${e_route.price}`, addPriceController );
priceRouter.patch(`${e_route.price}:id`, updatePriceController );

export { priceRouter };