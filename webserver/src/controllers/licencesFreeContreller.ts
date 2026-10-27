import type { Request, Response } from 'express';
import { addFreeLicences_Tr_Db, setDeletedFreeLicenceDb, getAllFreeLicenceDb, } from '@/services/licencesFreeService.js';
import { addPriceDb , deletePriceDb } from '@/services/priceService.js'
import { e_params } from '@/types/routePaths.js'

export async function getAllFreeLicenceController(req: Request, res: Response) {
  const id_company = Number(req.params[e_params.id_company])
  if (Number.isNaN(id_company)) {
    return res.status(400).json({ error: 'invalid id_company' })
  }
  try {
    await getAllFreeLicenceDb(id_company, true);
  } catch (err) {
  }
}

export async function addFreeLicenceController(req: Request, res: Response) {
  // console.log(req.body);
  // console.log(Number(req.params.id_company));
  // console.log(req.params.id_company);
  const id_company:number = Number(req.params.id_company)
  const id_super_admin: number = req.body.id_super_admin
  const id_licence_type: number =  req.body.id_licence_type
  const contract_price: number | null = req.body.contract_price
  const licence_count: number = req.body.licence_count
  
  console.log(id_super_admin);
  // to do handle bad request
  if( !id_company )
  {
    console.log('id_company', id_company);
    res.status(400).json({error: 'Invalid request params'})
    return
  }
  if( !id_super_admin || !id_licence_type || !licence_count)
  {
    res.status(400).json({error: 'Invalid request body'})
    return
  }

  

  try{
    await addFreeLicences_Tr_Db(
      id_company,
      id_super_admin,
      id_licence_type,
      contract_price,
      licence_count,
    )
  }
  catch(err)
  {
    console.error(err)
    res.status(500).json({error: 'Server error'})
    return
  }
  res.status(201).json({created: true})
}
export async function setDeletedFreeLicenceController(req: Request, res: Response) {
  const id_set_delete = 1
  try {
    await setDeletedFreeLicenceDb(id_set_delete)
  } catch (err) {
    
  }
}

