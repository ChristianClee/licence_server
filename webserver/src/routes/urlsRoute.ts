import { Router } from 'express';
import { addUrlController, getAllUrlsController, setDeletedUrlController } from '@/controllers/urlsController.js';
import { e_route } from './types.js'


const urlsRouter = Router();
urlsRouter.get(`${e_route.urls}`, getAllUrlsController );
urlsRouter.post(`${e_route.urls}`, addUrlController );
urlsRouter.patch(`${e_route.urls}:id`, setDeletedUrlController );

export { urlsRouter };