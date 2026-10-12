import type { Request, Response } from 'express';
import { getAllSuperUsersDb } from '@/services/superUsersService.js';

export async function getAllSuperUsersController(req: Request, res: Response) {
  try {
    await getAllSuperUsersDb();
  } catch (err) {    
  }
}
