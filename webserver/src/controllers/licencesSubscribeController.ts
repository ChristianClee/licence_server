import type { Request, Response } from 'express';
import { getAllSubscribedLicenceDb, addSubscribeLicenceDb, setDeletedSubscribedLicenceDb } from '@/services/licencesSubscribedService.js';



export async function getAllSubscribedLicenceController(req: Request, res: Response) {
  try {
    await getAllSubscribedLicenceDb()
  } catch (err) {
    
  }
}
export async function addSubscribedLicenceController(req: Request, res: Response) {
  const id_licence_free = 1;
  const id_url = 1;
  const created_ip = '192.168.1.1';
  const current_url = req.originalUrl 
  const {company_name, motherboard_serial_number, motherboard_model_number } = req.body

  /*
  1 check if 
    (motherboard_serial_number === db.motherboard.serial_number &&
    motherboard_model_number === db.motherboard.model_number)
    {
      setDelete motherboard_old
      take id licenceSubscribe(only one) from motherboard_old
      add motherboard_old + id licenceSubscribe 
    }
      else 
    {
      get Url.id from current_url
      check count licenceFree which 
      if(count > 0) add subscribe licence
      else send 402
    }

  */
  
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
