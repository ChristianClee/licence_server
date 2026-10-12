import type { Request, Response } from 'express';
import { addAveragePriceDb, getAllAveragePriceDb, setDeleteAveragePriceDb } from '@/services/averagePriceService.js'

export async function getAllAveragePriceController(req: Request, res: Response) {
  try {
    await getAllAveragePriceDb()
  } catch (err) {    
  }
}
export async function addAveragePriceController(req: Request, res: Response) {
    const id_licence_type = 1
    const price = 10000
  try {
     await addAveragePriceDb(id_licence_type, price)
  } catch (err) {
  }
}

export async function setDeletedPriceController(req: Request, res: Response) {
  const id_set_delete = 1
  try {
    setDeleteAveragePriceDb(id_set_delete)
  } catch (err) {
    
  }
}