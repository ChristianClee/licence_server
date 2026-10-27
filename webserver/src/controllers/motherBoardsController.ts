import type { Request, Response } from 'express'
import { addMotherBoardDb, getAllMotherBoardDb, setDeleteMotherBoardDb } from '@/services/motherBoardsService.js'

export async function getAllMotherBoardController(req: Request, res: Response){
    const id_company:number = Number(req.params.id_company)
    if( !id_company )
    {
    console.log('id_company', id_company);
    res.status(400).json({error: 'Invalid request params'})
    return
    }
    try{
        const data = await getAllMotherBoardDb(id_company, true)
        res.status(200).json({data})
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