import type { Request, Response } from 'express';
import { addUrlDb, getAllUrlsDb, setDeleteUrlDb } from '@/services/urlsService.js';

export async function getAllUrlsController(req: Request, res: Response) {
  try {
    await getAllUrlsDb()
  } catch (err) {    
  }
}
export async function addUrlController(req: Request, res: Response) {
    const id_company = 1
    const id_licence_type = 1
    const url = 'base_url'
  
  try {
     await addUrlDb(id_company, id_licence_type, url)
  } catch (err) {
  }
}
export async function setDeletedUrlController(req: Request, res: Response) {
  const id_set_delete = 1
  try {
    setDeleteUrlDb(id_set_delete)
  } catch (err) {
    
  }
}