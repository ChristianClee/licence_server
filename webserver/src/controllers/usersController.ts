import type { Request, Response } from 'express';
import { addUserDb, getAllUserDb, setDeleteUserDb } from '@/services/usersService.js';

export async function getAllUsersController(req: Request, res: Response) {
  try {
    await getAllUserDb();
  } catch (err) {    
  }
}
export async function addUserController(req: Request, res: Response) {
  const id_company = 1;
  const id_permission = 1;
  const email = 'stagor@gmail.com';
  const phone = '88007006050';
  
  try {
     await addUserDb(id_company, id_permission, email, phone)
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