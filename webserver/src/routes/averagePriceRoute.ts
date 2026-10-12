import { Router } from 'express';
import { addAveragePriceController, getAllAveragePriceController, setDeletedPriceController } from '@/controllers/averagePriceController.js';
import { e_route } from './types.js'

// TODO
const averagePriceRouter = Router();

averagePriceRouter.get(`${e_route.average_price}`, getAllAveragePriceController );
averagePriceRouter.post(`${e_route.average_price}`, addAveragePriceController );
averagePriceRouter.patch(`${e_route.average_price}:id`, setDeletedPriceController );


export { averagePriceRouter };