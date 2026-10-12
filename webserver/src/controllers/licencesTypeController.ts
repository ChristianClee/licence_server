import type { Request, Response } from 'express';
import { getAllLicencesTypeDb } from '@/services/licencesTypesSevice.js'

export async function getAllLicencesTypeController(req:Request, res:Response){
    try{
        await getAllLicencesTypeDb()
    }catch(err){
        
    }
}