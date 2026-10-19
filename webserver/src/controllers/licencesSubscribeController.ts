import type { Request, Response } from 'express';
import { getAllSubscribedLicenceDb, addSubscribeLicenceDb, setDeletedSubscribedLicenceDb } from '@/services/licencesSubscribedService.js';
import { getIdCompanyParamDb, getIdUrlParamDb  } from '@/services/urlsService.js'
import { isIdCompanyExistDb } from '@/services/companiesService.js'
import { addBadRequestDb } from '@/services/badRequestService.js'
import type{  i_url_table } from '@/types/tablesDb.js'
import { e_url_table } from '@/types/tablesDb.js'
import { isChangedLicenceDb } from '@/services/changedLicenceService.js'

export async function getAllSubscribedLicenceController(req: Request, res: Response) {
  try {
    await getAllSubscribedLicenceDb()
  } catch (err) {
    
  }
}
export async function addSubscribedLicenceController(req: Request, res: Response) {
  const created_ip = '192.168.1.1';
  const current_url = req.originalUrl 
  const {company_name, motherboard_serial_number, motherboard_model_number } = req.body
  let id_url = null;
  
  try
  {
    const url_table = await getIdUrlParamDb(current_url) as i_url_table
    id_url = url_table[e_url_table.id]
    const id_company = await getIdCompanyParamDb(url_table[e_url_table.id_Company], current_url)
    const isExist = await isChangedLicenceDb(motherboard_serial_number, motherboard_model_number)
    if(isExist.exists_flag)
    {
      // change licence
    }
    {
      // subscribe licence
    }
  }
  catch(err)
  {
    if( err instanceof Error){
      if(id_url){
        await addBadRequestDb(id_url, created_ip, err)
      }else(
        await addBadRequestDb(null, created_ip, err)
      )
    }
  }
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
  
  // try {
  //   await addSubscribeLicenceDb(id_licence_free, id_url, created_ip)
  // } catch (err) {
    
  // }
}
export async function setDeletedSubscribedLicenceController(req: Request, res: Response) {
  const id_set_delete = 1
  try {
    setDeletedSubscribedLicenceDb(id_set_delete)
  } catch (err) {
    
  }
}
