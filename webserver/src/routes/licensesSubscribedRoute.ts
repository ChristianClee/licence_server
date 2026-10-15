import { Router } from 'express';
import {
    getAllSubscribedLicenceController,
    addSubscribedLicenceController,
    setDeletedSubscribedLicenceController,
} from '@/controllers/licencesSubscribeController.js'
import { urls } from '@/db.js';
import { e_route, e_params } from '@/types/routePaths.js'


const getAllSubscribedLicencePath = `${e_route.urls}${e_params.id_url}${e_route.licences_subscribed}`
// const addSubscribedLicencePath = 
const setDeletedSubscribedLicencePath = `${e_route.urls}${e_params.id_url}${e_route.licences_subscribed}${e_params.id_licenceSubscribed}`


const licencesSubscribeRouter =  Router();
licencesSubscribeRouter.get( getAllSubscribedLicencePath, getAllSubscribedLicenceController)
for(let url of urls)
{
    licencesSubscribeRouter.post(url, addSubscribedLicenceController)
}
licencesSubscribeRouter.patch( setDeletedSubscribedLicencePath, setDeletedSubscribedLicenceController)

export {licencesSubscribeRouter}
