import type { Request, Response } from 'express';
import { addPriceDb, getAllPriceDb, updateAveragePriceDb } from '@/services/priceService.js'

export async function getAllPriceController(req: Request, res: Response) {
  try {
    await getAllPriceDb()
  } catch (err) {    
  }
}
export async function addPriceController(req: Request, res: Response) {
    const id_avarage_price = 1
    const price = 1000

  try {
     await addPriceDb(id_avarage_price, price)
  } catch (err) {
  }
}
export async function updatePriceController(req: Request, res: Response) {
  const id_set_delete = 1
  try {
    updateAveragePriceDb(id_set_delete)
  } catch (err) {
    
  }
}