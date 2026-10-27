import type { Request, Response } from 'express';
import { getAllLicencesTypeDb } from '@/services/licencesTypesSevice.js'

export async function getAllLicencesTypeController(req:Request, res:Response){
    try{
        const data = await getAllLicencesTypeDb('all')
        res.status(201).json({ data })
    }catch(err){
        
    }
}