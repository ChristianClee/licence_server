import type { Request, Response } from 'express';
import { addChangedLicenceDb, getAllChangedLicenceDb, setDeleteChangedLicenceDb } from '@/services/changedLicenceService.js';
import { e_params } from '@/types/routePaths.js'

export async function getAllChangedLicenceController(req:Request, res:Response){
    try{
        await getAllChangedLicenceDb()
    }catch(err){
        
    }
}
export async function addChangedLicenceController(req:Request, res:Response){
    const id_user = Number(req.params[e_params.id_user])
        if (Number.isNaN(id_user)) {
        return res.status(400).json({ error: 'invalid id_company' })
    }

    const {id_motherBoard, serial_number_new_board, model_number_new_board} = req.body
    const created_ip = '10.110.0.1'
    try{
        await addChangedLicenceDb(
            id_user,
            id_motherBoard,
            serial_number_new_board,
            model_number_new_board, 
            created_ip
        )
    }catch(err){

    }
}
export async function setDeleteChangedLicenceController(req:Request, res:Response){
    const id_set_delete = 1
    try{
        await setDeleteChangedLicenceDb(id_set_delete)
    }catch(err){

    }
}