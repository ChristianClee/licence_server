import { Router } from 'express';
import {
    getAllFreeLicenceController,
    addFreeLicenceController,
    setDeletedFreeLicenceController
} from '@/controllers/licencesFreeContreller.js'
import { e_route, e_params } from '@/types/routePaths.js'


const licenceFreeRouter =  Router();

const getAllFreeLicencePath = `${e_route.companies}${e_params.id_company}${e_route.licences_free}`;
const addFreeLicencePath = `${e_route.companies}${e_params.id_company}${e_route.licences_free}`; 
const setDeletedFreeLicencePath = `${e_route.companies}${e_params.id_company}${e_route.licences_free}${e_params.id_licenceFree}` 

// for company
licenceFreeRouter.get(getAllFreeLicencePath, getAllFreeLicenceController)
// only for super_admin
licenceFreeRouter.post(addFreeLicencePath, addFreeLicenceController)
// only for super_admin
licenceFreeRouter.patch(setDeletedFreeLicencePath, setDeletedFreeLicenceController) 

export {licenceFreeRouter}