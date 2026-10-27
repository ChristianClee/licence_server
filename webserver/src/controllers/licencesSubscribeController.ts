import type { Request, Response } from 'express';
import { pool } from "@/db.js"
import { getAllSubscribedLicenceDb, addSubscribeLicence_tr_Db, setDeletedSubscribedLicenceDb } from '@/services/licencesSubscribedService.js';
import { getIdCompanyParamDb, getIdUrlParamDb  } from '@/services/urlsService.js'
import { isIdCompanyExistDb } from '@/services/companiesService.js'
import { addBadRequestDb } from '@/services/badRequestService.js'
import type{  i_url_table } from '@/types/tablesDb.js'
import { e_url_table } from '@/types/tablesDb.js'
import { getIdChangedLicenceDb, changeLicence_tr_Db } from '@/services/changedLicenceService.js'
// import { addSubscribeLicenceDb } from '@/services/licencesSubscribedService.js'
import { getNotSubscribedFreeLicenceDb } from '@/services/licencesFreeService.js'
import { setDeleteMotherBoardDb, isExistSerialAndModelInMotherBoardDb } from '@/services/motherBoardsService.js'



export async function getAllSubscribedLicenceController(req: Request, res: Response) {
  try {
    await getAllSubscribedLicenceDb()
  } catch (err) {
    
  }
}
// export async function addSubscribedLicenceController(req: Request, res: Response) {
export async function addSubscribedLicenceController() {
  const created_ip = '192.168.1.1';
  const current_url = '/test_url_base'
  const { motherboard_serial_number, motherboard_model_number } = {motherboard_serial_number: 'serial test', motherboard_model_number: 'model test'}
  console.log('1');
  let id_url = null;
  
  try
  {
    const url_table = await getIdUrlParamDb(current_url) as i_url_table
    console.log('2', url_table);
    id_url = url_table[e_url_table.id]
    const id_company = await getIdCompanyParamDb(url_table[e_url_table.id_Company], current_url)
    console.log('3');
    const id_motherBoard_for_changing = await getIdChangedLicenceDb( motherboard_serial_number, motherboard_model_number );
    console.log('4');
    // console.log({id_motherBoard_for_changing});
    if(id_motherBoard_for_changing)
    {
      // create: new motherboard, licence_subscribe. Attach licence_free to new licence_subscribe
      await changeLicence_tr_Db(
        id_motherBoard_for_changing,
        motherboard_serial_number,
        motherboard_model_number
      )
      console.log('5');
    }
    else
    {
      const freeLicences = await getNotSubscribedFreeLicenceDb(id_company, id_url)
      console.log('6');
      const isExist = await isExistSerialAndModelInMotherBoardDb(motherboard_serial_number, motherboard_model_number)
      if(! freeLicences[0])
      {
        // to do send 402 status
        throw new Error('No free license')
      }
      if(isExist)
      {
        throw new Error(`The serial number = ${motherboard_serial_number} and model number = ${motherboard_model_number} already exist in db`)
      }
      // const isExist =
        await addSubscribeLicence_tr_Db(
          freeLicences[0].id,
          id_url,
          created_ip,
          motherboard_serial_number,
          motherboard_model_number
        )
        console.log('7');

    }
  }
  catch(err)
  {
    console.log('err', err);
    console.log('err instanceof Error ========== ', err instanceof Error);
    if( err instanceof Error){
      if(id_url){
        await addBadRequestDb(id_url, motherboard_serial_number, motherboard_model_number, created_ip, err)
        console.log('8');
      }
      else
      {
        await addBadRequestDb(null, motherboard_serial_number, motherboard_model_number, created_ip, err)
        console.log('9');
      }
    }
  }
}
export async function setDeletedSubscribedLicenceController(req: Request, res: Response) {
  const id_set_delete = 1
  try {
    setDeletedSubscribedLicenceDb(id_set_delete)
  } catch (err) {
    
  }
}

