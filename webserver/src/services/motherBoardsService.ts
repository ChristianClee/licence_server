import { dbReq } from "@/db.js"
import type { RowDataPacket, ResultSetHeader } from "mysql2"
import { e_nameTablesDb, e_methodsDb } from '@/types/other.js'
import type{ i_exist } from '@/types/other.js'

export const pathDbRequest = `motherboard/${e_nameTablesDb.Mother_board}_`

export async function getAllMotherBoardDb(){
    
}

export async function addMotherBoardDb(id_licence_subscribe:number, serial_number:string, model_number:string):Promise <number|Error>
{
    const sqlRequest = `${pathDbRequest}${e_methodsDb.AddOne}.sql`
    const response = await dbReq<ResultSetHeader>('execute', sqlRequest, [id_licence_subscribe, serial_number, model_number])
    return response.insertId

}
export async function setDeleteMotherBoardDb(id_set_delete:number){
    const sqlRequest_IsExist = `${pathDbRequest}${e_methodsDb.IsExist}.sql`
    const sqlRequest_SetDeleted = `${pathDbRequest}${e_methodsDb.SetDeleted}.sql`
    const isExist = await dbReq<i_exist[]>('execute', sqlRequest_IsExist , [id_set_delete])
    if(! isExist[0]?.exists_flag)
    {
        throw new Error(`нет такой Licence_free с id = ${id_set_delete}`)
    }
    await dbReq<ResultSetHeader>('execute', sqlRequest_SetDeleted, [id_set_delete])
}