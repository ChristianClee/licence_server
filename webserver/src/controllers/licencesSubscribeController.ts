import type { Request, Response } from 'express';
import { getAllSubscribedLicenceDb, addSubscribeLicenceDb, setDeletedSubscribedLicenceDb } from '@/services/licencesSubscribedService.js';



export async function getSubscribedLicenceController(req: Request, res: Response) {
  try {
    await getAllSubscribedLicenceDb()
  } catch (err) {
    
  }
}
export async function addSubscribedLicenceController(req: Request, res: Response) {
  const id_licence_free = 1;
  const id_url = 1;
  const created_ip = '192.168.1.1';
  try {
    await addSubscribeLicenceDb(id_licence_free, id_url, created_ip)
  } catch (err) {
    
  }
}
export async function setDeletedSubscribedLicenceController(req: Request, res: Response) {
  const id_set_delete = 1
  try {
    setDeletedSubscribedLicenceDb(id_set_delete)
  } catch (err) {
    
  }
}
