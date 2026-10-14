import { Router } from 'express';
import { getAllLicencesTypeController } from '@/controllers/licencesTypeController.js';
import { e_route } from '../types/routePaths.js'


const licencesTypeRouter =  Router();
licencesTypeRouter.get(`${e_route.licences_type}`, getAllLicencesTypeController)

export {licencesTypeRouter}
