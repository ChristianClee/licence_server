import { dbReq } from "@/db.js"
import type { RowDataPacket, ResultSetHeader } from "mysql2";
import {e_methodsDb, e_nameTablesDb} from '@/types/other.js'
import type{ i_exist } from '@/types/other.js'
import { pathDbRequest as motherboardDbRequest } from '@/services/motherBoardsService.js'

const pathDbRequest = `changedLicence/${e_nameTablesDb.Changed_licence_req}_`


export async function getAllChangedLicenceDb(){

}
export async function addChangedLicenceDb(
    id_user: number,
    id_motherBoard: number,
    serial_number_new_board: string,
    model_number_new_board: string,
    created_ip: string,

): Promise<number | Error>
{
    const sqlRequest_IsExist = `${motherboardDbRequest}${e_methodsDb.IsExist}.sql`
    const sqlRequest_AddOne = `${pathDbRequest}${e_methodsDb.AddOne}.sql`

    const isExist = await dbReq<i_exist[]>('execute',sqlRequest_IsExist , [id_motherBoard])
    if(! isExist[0]?.exists_flag)
    {
        throw new Error(`нет такой компании с id = ${id_motherBoard}`)
    }

    const response = await dbReq<ResultSetHeader>('execute', sqlRequest_AddOne, [id_user, id_motherBoard, serial_number_new_board, model_number_new_board, created_ip])
    return response.insertId;

}
export async function setDeleteChangedLicenceDb(id_set_delete: number){

}
