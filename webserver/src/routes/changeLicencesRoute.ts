import { Router } from 'express';
import { addChangeLicenceController, getAllChangeLicenceController, setDeleteChangeLicenceController } from '@/controllers/changedLicenceController.js'
import { e_route } from '../types/routePaths.js'


const changedLicenceRouter = Router();

changedLicenceRouter.get(`${e_route.changed_licences}`, getAllChangeLicenceController)
changedLicenceRouter.post(`${e_route.changed_licences}`, addChangeLicenceController)
changedLicenceRouter.patch(`${e_route.changed_licences}:id`, setDeleteChangeLicenceController)

export { changedLicenceRouter };
