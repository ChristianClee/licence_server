import type { Request, Response } from 'express';


export function getRoleController(reg:Request, res:Response){
    if(!reg.user){
        res.status(401).end({error: 'unauthorized'})
        return
    }
    const permission = reg.user.permission
    res.status(200).json({permission})
}