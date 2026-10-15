import { Router } from 'express';
import { addChangedLicenceController, getAllChangedLicenceController, setDeleteChangedLicenceController } from '@/controllers/changedLicenceController.js'
import { e_route, e_params } from '@/types/routePaths.js'


const getAllChangedLicencePath = `${e_route.companies}${e_params.id_company}${e_route.changed_licences}`
const addChangedLicencePath = `${e_route.urls}${e_params.id_user}${e_route.changed_licences}`
const setDeletedChangedLicencePath = `${e_route.urls}${e_params.id_user}${e_route.changed_licences}${e_params.id_changedLicence}`

const changedLicenceRouter = Router();

changedLicenceRouter.get(getAllChangedLicencePath, getAllChangedLicenceController)
changedLicenceRouter.post(addChangedLicencePath, addChangedLicenceController)
changedLicenceRouter.patch(setDeletedChangedLicencePath, setDeleteChangedLicenceController)

export { changedLicenceRouter };
