import type { Request, Response } from 'express';
import { addAveragePrice_Tr_Db, getAllAveragePriceDb } from '@/services/averagePriceService.js'

export async function getAllAveragePriceController(req: Request, res: Response) {
  try {
    await getAllAveragePriceDb(true)
  } catch (err) {    
  }
}
export async function addAveragePriceController(req: Request, res: Response) {
    const id_licence_type = 1
    const price = 10000
  try {
     await addAveragePrice_Tr_Db(id_licence_type, price)
  } catch (err) {
  }
}
