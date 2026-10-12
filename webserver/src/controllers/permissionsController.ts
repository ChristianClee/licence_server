import type { Request, Response } from 'express';
import { getAllPermissionsDb } from '@/services/permissionsService.js'

export async function getAllPermissionsController(req:Request, res:Response){
    try{
        await getAllPermissionsDb()
    }catch(err){
        
    }
}