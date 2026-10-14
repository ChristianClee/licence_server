import { Router } from 'express';
import { addAveragePriceController, getAllAveragePriceController } from '@/controllers/averagePriceController.js';
import { e_route, e_params } from '@/types/routePaths.js'


const averagePriceRouter = Router();

averagePriceRouter.get(`${e_route.licences_type}${e_route.average_price}`, getAllAveragePriceController );
averagePriceRouter.post(`${e_route.licences_type}${e_params.id_licenceType}${e_route.average_price}`, addAveragePriceController );

export { averagePriceRouter };