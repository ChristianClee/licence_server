import { Router } from 'express'
import { addCompanyController, getAllCompanyController, setDeleteCompanyController } from "@/controllers/companiesController.js"
import { e_route } from './types.js'

const companyRouter = Router();


companyRouter.get(`${e_route.companies}`, getAllCompanyController);
companyRouter.post(`${e_route.companies}`, addCompanyController);
companyRouter.patch(`${e_route.companies}:id`, setDeleteCompanyController);

export { companyRouter };