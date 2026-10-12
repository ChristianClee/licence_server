import type { Request, Response } from 'express';
import { addFreeLicenceDb, setDeletedFreeLicenceDb, getAllFreeLicenceDb, } from '@/services/licencesFreeService.js';



export async function getAllFreeLicenceController(req: Request, res: Response) {
  try {
    await getAllFreeLicenceDb();
  } catch (err) {    
  }
}
export async function addFreeLicenceController(req: Request, res: Response) {
  const id_company = 1;
  const id_price = 1;
  const id_super_admin = 1;
  try {
     await addFreeLicenceDb(id_company, id_price, id_super_admin)
  } catch (err) {
  }
}
export async function setDeletedFreeLicenceController(req: Request, res: Response) {
  const id_set_delete = 1
  try {
    await setDeletedFreeLicenceDb(id_set_delete)
  } catch (err) {
    
  }
}

