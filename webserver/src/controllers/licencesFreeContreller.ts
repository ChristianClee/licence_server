import type { Request, Response } from 'express';
import { addFreeLicencesDb, setDeletedFreeLicenceDb, getAllFreeLicenceDb, } from '@/services/licencesFreeService.js';
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
  const id_company = Number(req.params[e_params.id_company])
  if (Number.isNaN(id_company)) {
    return res.status(400).json({ error: 'invalid id_company' })
  }
  const {id_averagePrice, id_super_admin, contract_price, count_licence} = req.body
  let id_price = 0
  try {
    id_price = await addPriceDb(id_averagePrice, contract_price)
    await addFreeLicencesDb(id_company, id_super_admin, id_price, count_licence)
  } catch (err) {
    await deletePriceDb(id_price);
  }
}
export async function setDeletedFreeLicenceController(req: Request, res: Response) {
  const id_set_delete = 1
  try {
    await setDeletedFreeLicenceDb(id_set_delete)
  } catch (err) {
    
  }
}

