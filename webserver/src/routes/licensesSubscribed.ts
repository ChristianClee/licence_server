import { Router } from 'express';
import {
    getSubscribedLicenceController,
    addSubscribedLicenceController,
    setDeletedSubscribedLicenceController,
} from '@/controllers/licencesSubscribeController.js'
import { urls } from '@/db.js';
import { e_route } from '../types/routePaths.js'


const licencesSubscribeRouter =  Router();
licencesSubscribeRouter.get(`${e_route.licences_subscribed}`, getSubscribedLicenceController)
for(let url of urls)
{
    licencesSubscribeRouter.post(url, addSubscribedLicenceController)
}
licencesSubscribeRouter.patch(`${e_route.licences_subscribed}:id`, setDeletedSubscribedLicenceController)

export {licencesSubscribeRouter}
