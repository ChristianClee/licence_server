import type { Request, Response } from 'express'
import { addMotherBoardDb, getAllMotherBoardDb, setDeleteMotherBoardDb } from '@/services/motherBoardsService.js'

export async function getAllMotherBoardController(req: Request, res: Response){
    try{
        // await getAllMotherBoardDb()
    }catch(err){
        console.log(err)
    }
}
export async function addMotherBoardController(req: Request, res: Response){
    const id_licence_subscribe = 1;

    const serial_number = `SERIAL_${Date.now()}`;
    const model_number = `SERIAL_${Date.now()}`;
    try{
        await addMotherBoardDb(id_licence_subscribe, serial_number, model_number);
    }catch(err){
        console.log(err)
    }
}
export async function setDeleteMotherBoardController(req: Request, res: Response){
    const id_set_delete = 1
    try{
        await setDeleteMotherBoardDb(id_set_delete);
    }catch(err){
        console.log(err)
    }
}