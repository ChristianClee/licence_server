import { dbReq } from "@/db.js"
import type { RowDataPacket, ResultSetHeader } from "mysql2"
import { e_nameTablesDb, e_methodsDb } from '@/types/other.js'
import type{ i_exist } from '@/types/other.js'
import type { i_motherBoard_table } from '@/types/tablesDb.js'
import { filter_deleted_date_time } from '@/utils/index.js'

export const pathDbRequest = `motherboard/${e_nameTablesDb.Mother_board}_`
interface i_common_table extends RowDataPacket, i_motherBoard_table {}


export async function getAllMotherBoardDb(is_filter:boolean, id_company: number): Promise <i_motherBoard_table[] | Error>
{
    const sqlRequest = `${pathDbRequest}${e_methodsDb.GetAll}.sql`
    const response = await dbReq<i_common_table[]>('execute', sqlRequest , [id_company])
    if(is_filter)
    {
        return filter_deleted_date_time(response)
    }
    return response
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