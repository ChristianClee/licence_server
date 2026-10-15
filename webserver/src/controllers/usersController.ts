import type { Request, Response } from 'express';
import { addUserDb, getAllUserDb, setDeleteUserDb } from '@/services/usersService.js';
import { e_params } from '@/types/routePaths.js'


export async function getAllUsersController(req: Request, res: Response) {
  try {
    await getAllUserDb();
  } catch (err) {
  }
}
export async function addUserController(req: Request, res: Response) {
  const id_company = Number(req.params[e_params.id_company]);
  if (Number.isNaN(id_company)) {
    return res.status(400).json({ error: 'invalid id_company' })
  }
  const {id_permission, password, email, phone} = req.body;

  
  try { 
     await addUserDb(id_company, id_permission, password, email, phone)
  } catch (err) {
    
  }
}
export async function setDeletedUserController(req: Request, res: Response) {
  const id_set_delete = 1
  try {
    await setDeleteUserDb(id_set_delete)
  } catch (err) {
    
  }
}