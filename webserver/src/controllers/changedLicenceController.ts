import type { Request, Response } from 'express';
import { addChangeLicenceDb, getAllChangeLicenceDb, setDeleteChangeLicenceDb } from '@/services/changedLicenceService.js';


export async function getAllChangeLicenceController(req:Request, res:Response){
    try{
        await getAllChangeLicenceDb()
    }catch(err){
        
    }
}
export async function addChangeLicenceController(req:Request, res:Response){
    const id_user = 1;
    const id_motherBoard = 1
    const serial_number_new_board = `SERIAL_new ${Date.now()}`
    const model_number_new_board = `MODEL_new ${Date.now()}`
    const created_ip = '10.110.0.1'
    try{
        await addChangeLicenceDb(
            id_user, id_motherBoard,
            serial_number_new_board,
            model_number_new_board,
            created_ip
        )
    }catch(err){

    }
}
export async function setDeleteChangeLicenceController(req:Request, res:Response){
    const id_set_delete = 1
    try{
        await setDeleteChangeLicenceDb(id_set_delete)
    }catch(err){

    }
}