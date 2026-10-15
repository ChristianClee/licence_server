import { dbReq } from "@/db.js"
import type { RowDataPacket, ResultSetHeader } from "mysql2";
import { pathDbRequest as motherboardDbRequest } from '@/services/motherBoardsService.js'
import {e_methodsDb, e_nameTablesDb} from '@/types/other.js'
import type{ i_exist } from '@/types/other.js'

const pathDbRequest = `licenceSubscribed/${e_nameTablesDb.Licence_subscribe}_`


export async function getAllSubscribedLicenceDb(){ 

}
export async function addSubscribeLicenceDb(id_licence_free: number, id_url: number, created_ip: string):Promise<number| Error>{ 
    const sqlRequest = `${pathDbRequest}${e_methodsDb.AddOne}.sql`
    const response = await dbReq<ResultSetHeader>('execute', sqlRequest, [id_licence_free, id_url, created_ip]) 
    return response.insertId;
}

export async function setDeletedSubscribedLicenceDb(id_set_delete:number): Promise<void | Error>{
    const sqlRequest_IsExist = `${pathDbRequest}${e_methodsDb.IsExist}.sql`
    const sqlRequest_SetDeleted = `${pathDbRequest}${e_methodsDb.SetDeleted}.sql`
    const isExist = await dbReq<i_exist[]>('execute', sqlRequest_IsExist , [id_set_delete])
    if(! isExist[0]?.exists_flag)
    {
        throw new Error(`нет такой Licence_free с id = ${id_set_delete}`)
    }
    await dbReq<ResultSetHeader>('execute', sqlRequest_SetDeleted, [id_set_delete])
}


   