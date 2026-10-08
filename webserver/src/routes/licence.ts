import { Router } from 'express';
import type { Request, Response } from 'express';
import { urls } from '@/db.js';

function todoRote ( req:Request, res:Response ){

}

const licenceRouter =  Router();
for(let url of urls){
    licenceRouter.get(url, todoRote)
    licenceRouter.post(url, todoRote)
    licenceRouter.delete(url, todoRote)
}



export {licenceRouter}



