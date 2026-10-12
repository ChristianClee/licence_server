import { Router } from 'express';
import {
    getAllFreeLicenceController,
    addFreeLicenceController,
    setDeletedFreeLicenceController
} from '@/controllers/licencesFreeContreller.js'
import { e_route } from './types.js'


const licenceFreeRouter =  Router();

licenceFreeRouter.get(`${e_route.licences_free}`, getAllFreeLicenceController)
licenceFreeRouter.post(`${e_route.licences_free}`, addFreeLicenceController)
licenceFreeRouter.patch(`${e_route.licences_free}:id`, setDeletedFreeLicenceController)

export {licenceFreeRouter}