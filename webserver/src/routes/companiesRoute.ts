import { Router } from 'express'
import { addCompanyController, getAllCompanyController, setDeleteCompanyController } from "@/controllers/companiesController.js"
import { e_route, e_params } from '@/types/routePaths.js'


const companyRouter = Router();

const getAllCompanyPath = `${e_route.companies}`
const addCompanyPath = `${e_route.companies}`
const setDeleteCompanyPath = `${e_route.companies}${e_params.id_company}`

companyRouter.get(getAllCompanyPath, getAllCompanyController);
companyRouter.post(addCompanyPath, addCompanyController);
companyRouter.patch(setDeleteCompanyPath, setDeleteCompanyController);

export { companyRouter };