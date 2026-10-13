import type { Request, Response } from 'express'
import { addCompanyDb, getAllCompanyDb, setDeleteCompanyDb } from "@/services/companiesService.js"


const id_super_user = 1; 
const name_company = "DEPO"

  
export async function getAllCompanyController(req: Request, res: Response) {
  try {
    await getAllCompanyDb('all')
  } catch (err) {
    console.log(err);
  }
}
export async function addCompanyController(req: Request, res: Response) {
  try {
    await addCompanyDb(id_super_user, name_company)
  } catch (err) {
    console.log(err);
  }
}
export async function setDeleteCompanyController(req: Request, res: Response) {
  // to do 
  const queryParam = 11;
  try {
    await setDeleteCompanyDb( queryParam )
  } catch (err) {
    console.log(err);
  }
}